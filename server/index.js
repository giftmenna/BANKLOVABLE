import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import history from 'connect-history-api-fallback';
import fs from 'fs';
import { body, validationResult } from 'express-validator';
import cookieParser from 'cookie-parser';
import { db, initializeDatabase } from './db.js';

// Define __dirname and __filename for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config(); // ✅ Load from system ENV (Render dashboard) or local .env if present


// Validate critical environment variables
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is required in .env');
  process.exit(1);
}

// Initialize Express app
const app = express();
const port = process.env.PORT || 5001;

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`📥 Incoming request: ${req.method} ${req.url}`);
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`📤 Response: ${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  });
  next();
});

// Core middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// CORS configuration
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [
  'http://localhost:3000',
  'https://originallovable.onrender.com',
];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Signup'],
  credentials: true,
}));

// Content Security Policy
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.setHeader(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        `connect-src 'self' ${allowedOrigins.join(' ')}`,
        "style-src 'self' 'unsafe-inline'",
        "script-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https://via.placeholder.com", // Allow placeholder images
        "font-src 'self'",
        "frame-src 'self'",
      ].join('; ')
    );
  }
  next();
});

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const headerToken = authHeader && authHeader.split(' ')[1];
  const cookieToken = req.cookies?.token;
  const token = cookieToken || headerToken;

  if (!token) {
    console.log('❌ No token provided');
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('❌ Token verification failed:', err.message);
      return res.status(403).json({ 
        message: err.name === 'TokenExpiredError' ? 'Token expired. Please log in again.' : 'Invalid token.' 
      });
    }
    req.user = user;
    next();
  });
}

// File upload storage for avatars
const uploadDir = path.join(__dirname, 'Uploads', 'avatars');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const userId = req.params.userId || uuidv4();
    const fileExt = path.extname(file.originalname);
    cb(null, `avatar-${userId}${fileExt}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .jpg, and .png files are allowed'));
    }
  },
});

// Rate limiting for login attempts
const loginAttempts = new Map();
setInterval(() => loginAttempts.clear(), 60 * 60 * 1000);

// API Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    data: { 
      uptime: process.uptime(), 
      status: 'OK', 
      timestamp: new Date().toISOString() 
    } 
  });
});

app.get('/api/health/db', async (req, res) => {
  try {
    const result = await db.pool.query('SELECT NOW()');
    res.json({ 
      data: { 
        status: 'Database connected', 
        timestamp: result.rows[0].now 
      } 
    });
  } catch (error) {
    console.error('❌ Database health check error:', error.message);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

app.post('/api/signup', [
  body('full_name').trim().notEmpty().withMessage('Full name is required'),
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    const settings = await db.getSettings();
    if (settings && settings.allowNewUsers === false) {
      return res.status(403).json({ message: 'Registrations are disabled.' });
    }
    const user = await db.createUser(req.body);
    res.status(201).json({ data: user });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    console.error('❌ Error in signup:', error.message);
    res.status(500).json({ message: 'Server error creating user', error: error.message });
  }
});

app.post('/api/users', [
  body('full_name').trim().notEmpty().withMessage('Full name is required'),
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  authenticateToken,
], async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    const user = await db.createUser(req.body);
    res.status(201).json({ data: user });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    console.error('❌ Error creating user:', error.message);
    res.status(500).json({ message: 'Server error creating user', error: error.message });
  }
});

app.post('/api/users/:userId/verify-pin', authenticateToken, async (req, res) => {
  try {
    const { pin } = req.body;
    const { userId } = req.params;
    console.log('🔍 [BACKEND] PIN verification request:', { userId, pin: pin ? '[REDACTED]' : null });
    
    if (!pin || typeof pin !== 'string') {
      console.log('❌ [BACKEND] Invalid PIN format');
      return res.status(400).json({ message: 'PIN is required and must be a string.' });
    }
    
    const user = await db.getUserById(userId);
    console.log('🔍 [BACKEND] User lookup result:', { 
      found: !!user, 
      hasPin: !!user?.pin,
      userId: user?.id 
    });
    
    if (!user || !user.pin) {
      console.log('❌ [BACKEND] User or PIN not found');
      return res.status(404).json({ message: 'User or PIN not found.' });
    }
    
    const isValid = await bcrypt.compare(pin, user.pin);
    console.log('🔍 [BACKEND] PIN verification result:', { valid: isValid });
    res.json({ data: { valid: isValid } });
  } catch (error) {
    console.error('❌ Error verifying PIN:', error.message);
    res.status(500).json({ message: 'Server error verifying PIN', error: error.message });
  }
});

app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const users = await db.getUsers();
    res.json({ user }); // ✅ this format only
  } catch (error) {
    console.error('❌ Error fetching users:', error.message);
    res.status(500).json({ message: 'Server error fetching users', error: error.message });
  }
});

app.delete('/api/users/:id', authenticateToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    await db.deleteUser(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting user:', error.message);
    res.status(500).json({ message: 'Server error deleting user', error: error.message });
  }
});

app.patch('/api/users/:id/status', authenticateToken, [
  body('status').isIn(['Active', 'Inactive']).withMessage('Status must be Active or Inactive'),
], async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    const user = await db.updateUserStatus(req.params.id, req.body.status);
    res.json({ data: user });
  } catch (error) {
    console.error('❌ Error updating user status:', error.message);
    res.status(500).json({ message: 'Server error updating user status', error: error.message });
  }
});

app.patch('/api/users/:id/balance', authenticateToken, [
  body('balance').isFloat({ min: 0 }).withMessage('Balance must be a positive number'),
], async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    const user = await db.updateUserBalance(req.params.id, req.body.balance);
    res.json({ data: user });
  } catch (error) {
    console.error('❌ Error updating user balance:', error.message);
    res.status(500).json({ message: 'Server error updating user balance', error: error.message });
  }
});

app.post('/api/login', [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  const ip = req.ip;
  const attempts = loginAttempts.get(ip) || 0;
  if (attempts >= 5) {
    console.log(`🚫 Too many login attempts from ${ip}`);
    return res.status(429).json({ message: 'Too many login attempts. Please try again later.' });
  }

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("❌ Validation errors:", errors.array());
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const { username, password } = req.body;
    console.log("🔐 Login attempt:", username);
    const user = await db.getUserByUsername(username);

    if (!user) {
      console.log("❌ User not found:", username);
      loginAttempts.set(ip, attempts + 1);
      return res.status(401).json({ message: 'User not found. Please check your username.' });
    }

    if (user.status !== 'Active') {
      console.log("❌ Inactive account:", username);
      return res.status(403).json({ message: 'Your account is inactive. Please contact support.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log("❌ Invalid password for:", username);
      loginAttempts.set(ip, attempts + 1);
      return res.status(401).json({ message: 'Incorrect password. Please try again.' });
    }

    loginAttempts.delete(ip);
    await db.updateUserLastLogin(user.id);
    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000,
    });

    const responseData = {
      user: {
        id: user.id,
        username: user.username,
        fullName: user.full_name,
        email: user.email,
        isAdmin: user.is_admin,
        avatar: user.avatar,
      },
    };

    console.log("✅ Login success, sending user data:", responseData);
    res.json(responseData);
  } catch (error) {
    console.error('🔥 Login error:', error.message);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});


app.post('/api/logout', authenticateToken, async (req, res) => {
  try {
    res.clearCookie('token', { httpOnly: true, sameSite: 'Strict', secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('❌ Logout error:', error.message);
    res.status(500).json({ message: 'Server error during logout' });
  }
});

app.get('/api/me', authenticateToken, async (req, res) => {
  try {
    const user = await db.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      data: {
        user: {
          id: user.id,
          username: user.username,
          fullName: user.full_name,
          email: user.email,
          balance: user.balance,
          isAdmin: user.is_admin,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    console.error('❌ Error fetching current user:', error.message);
    res.status(500).json({ message: 'Server error fetching user data' });
  }
});

app.get('/api/session', authenticateToken, async (req, res) => {
  try {
    res.json({ data: { isLoggedIn: true } });
  } catch (error) {
    console.error('❌ Session check error:', error.message);
    res.status(500).json({ message: 'Server error checking session' });
  }
});

app.post('/api/transactions', authenticateToken, [
  body('user_id').notEmpty().withMessage('User ID is required'),
  body('type').isIn(['Deposit', 'Withdrawal', 'Transfer', 'Bill Pay']).withMessage('Valid transaction type is required'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be a positive number'),
  body('date_time').isISO8601().withMessage('Valid date and time is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    if (!req.user.isAdmin && req.body.user_id !== req.user.id) {
      return res.status(403).json({ message: 'You can only create transactions for your own account' });
    }
    const transaction = await db.createTransaction(req.body);
    res.status(201).json({ data: transaction });
  } catch (error) {
    console.error('❌ Error creating transaction:', error.message);
    res.status(500).json({ message: 'Server error creating transaction', error: error.message });
  }
});

app.get('/api/transactions', authenticateToken, async (req, res) => {
  try {
    const transactions = req.user.isAdmin 
      ? await db.getTransactions() 
      : await db.getUserTransactions(req.user.id);
    res.json({ data: transactions });
  } catch (error) {
    console.error('❌ Error fetching transactions:', error.message);
    res.status(500).json({ message: 'Server error fetching transactions', error: error.message });
  }
});

app.delete('/api/transactions/:id', authenticateToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const result = await db.deleteTransaction(req.params.id);
    res.json({ data: result });
  } catch (error) {
    console.error('❌ Error deleting transaction:', error.message);
    res.status(500).json({ message: 'Server error deleting transaction', error: error.message });
  }
});

app.get('/api/settings', authenticateToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const settings = await db.getSettings();
    res.json({ data: settings });
  } catch (error) {
    console.error('❌ Error fetching settings:', error.message);
    res.status(500).json({ message: 'Server error fetching settings', error: error.message });
  }
});

app.patch('/api/settings', authenticateToken, [
  body('systemName').notEmpty().withMessage('System name is required'),
  body('maintenance').isBoolean().withMessage('Maintenance must be a boolean'),
  body('allowNewUsers').isBoolean().withMessage('AllowNewUsers must be a boolean'),
  body('contactEmail').isEmail().withMessage('Valid contact email is required'),
], async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    const settings = await db.updateSettings(req.body);
    res.json({ data: settings });
  } catch (error) {
    console.error('❌ Error updating settings:', error.message);
    res.status(500).json({ message: 'Server error updating settings', error: error.message });
  }
});

app.get('/api/users/:id', authenticateToken, async (req, res) => {
  try {
    if (!req.user.isAdmin && req.params.id !== req.user.id) {
      return res.status(403).json({ message: 'You can only access your own user details' });
    }
    const user = await db.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      data: {
        id: user.id,
        username: user.username,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        status: user.status,
        balance: user.balance,
        isAdmin: user.is_admin,
        avatar: user.avatar,
        created_at: user.created_at,
        last_login: user.last_login,
      },
    });
  } catch (error) {
    console.error('❌ Error fetching user by ID:', error.message);
    res.status(500).json({ message: 'Server error fetching user', error: error.message });
  }
});

app.get('/api/users/:userId/transactions', authenticateToken, async (req, res) => {
  try {
    if (!req.user.isAdmin && req.params.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only access your own transactions' });
    }
    const transactions = await db.getUserTransactions(req.params.userId);
    res.json({ data: transactions });
  } catch (error) {
    console.error('❌ Error fetching user transactions:', error.message);
    res.status(500).json({ message: 'Server error fetching transactions', error: error.message });
  }
});

app.patch('/api/users/:id/avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.user.isAdmin && req.params.id !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your own avatar' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Avatar file is required' });
    }
    const avatarPath = `/Uploads/avatars/${req.file.filename}`;
    const user = await db.updateUserAvatar(req.params.id, avatarPath);
    res.json({ 
      data: { 
        message: 'Avatar updated successfully', 
        avatar: user.avatar 
      } 
    });
  } catch (error) {
    console.error('❌ Error updating user avatar:', error.message);
    res.status(500).json({ message: 'Server error updating avatar', error: error.message });
  }
});

app.delete('/api/users/:id/avatar', authenticateToken, async (req, res) => {
  try {
    if (!req.user.isAdmin && req.params.id !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own avatar' });
    }
    await db.deleteUserAvatar(req.params.id);
    res.json({ message: 'Avatar deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting user avatar:', error.message);
    res.status(500).json({ message: 'Server error deleting avatar', error: error.message });
  }
});

// Static files and SPA fallback
const staticDir = path.join(__dirname, 'dist');
app.use('/Uploads/avatars', express.static(uploadDir));
app.use(express.static(staticDir));
app.use(history({
  rewrites: [
    { from: /^\/api\/.*/, to: (context) => context.parsedUrl.path },
    { from: /^\/Uploads\/.*/, to: (context) => context.parsedUrl.path },
    { from: /.*/, to: () => '/index.html' },
  ],
}));
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Cannot GET / - Frontend assets not found');
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', { message: err.message, path: req.path, method: req.method });
  res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});

// Start server
async function startServer() {
  try {
    await initializeDatabase();
    console.log('✅ Database initialized');
    const result = await db.pool.query('SELECT NOW()');
    console.log('✅ Database connection verified:', result.rows[0].now);
    const adminUser = await db.getUserByUsername('admin');
    if (!adminUser) {
      if (!process.env.ADMIN_PASSWORD) {
        console.error('❌ ADMIN_PASSWORD is required in .env');
        process.exit(1);
      }
      console.log('🛠 Creating default admin user...');
      await db.createUser({
        username: 'admin',
        password: process.env.ADMIN_PASSWORD,
        full_name: 'System Administrator',
        email: 'admin@example.com',
        is_admin: true,
      });
      console.log('✅ Admin user created');
    }
    app.listen(port, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://0.0.0.0:${port}`);
    });
    setInterval(async () => {
      try {
        await db.pool.query('SELECT NOW()');
      } catch (err) {
        console.error('❌ Keep-alive query failed:', err.message);
      }
    }, 4 * 60 * 1000);
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}
startServer();