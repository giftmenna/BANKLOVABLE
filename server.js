import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { db, initializeDatabase } from './server/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { body, validationResult } from 'express-validator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5002;

// Load environment variables
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'your-secret-key-here-change-in-production';
}

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://originallovable.onrender.com', 'https://originallovable-backend.onrender.com']
    : ['http://localhost:3000', 'http://localhost:5002'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Signup'],
  credentials: true,
}));

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const headerToken = authHeader && authHeader.split(' ')[1];
  const cookieToken = req.cookies?.token;
  const token = cookieToken || headerToken;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: err.name === 'TokenExpiredError' ? 'Token expired. Please log in again.' : 'Invalid token.' });
    }
    req.user = user;
    next();
  });
}

// API Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ uptime: process.uptime(), status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/health/db', async (req, res) => {
  try {
    const result = await db.pool.query('SELECT NOW()');
    res.json({ status: 'Database connected', timestamp: result.rows[0].now });
  } catch (error) {
    console.error('❌ Database health check error:', error.message);
    res.status(500).json({ status: 'Database connection failed', error: error.message });
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
      return res.status(400).json({ errors: errors.array() });
    }
    const settings = await db.getSettings();
    if (settings && settings.allowNewUsers === false) {
      return res.status(403).json({ message: 'Registrations are disabled.' });
    }
    const user = await db.createUser(req.body);
    res.status(201).json({ user });
  } catch (error) {
    console.error('❌ Error in signup:', error.message);
    res.status(500).json({ message: 'Server error creating user', error: error.message });
  }
});

app.post('/api/login', [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    const user = await db.getUserByUsername(username);
    if (!user || user.status !== 'Active') {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    await db.updateUserLastLogin(user.id);
    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000,
    });
    res.json({
      user: {
        id: user.id,
        username: user.username,
        fullName: user.full_name,
        email: user.email,
        isAdmin: user.is_admin,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
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
      user: {
        id: user.id,
        username: user.username,
        fullName: user.full_name,
        email: user.email,
        balance: user.balance,
        isAdmin: user.is_admin,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('❌ Error fetching current user:', error.message);
    res.status(500).json({ message: 'Server error fetching user data' });
  }
});

app.get('/api/session', authenticateToken, async (req, res) => {
  try {
    res.json({ isLoggedIn: true });
  } catch (error) {
    console.error('❌ Session check error:', error.message);
    res.status(500).json({ message: 'Server error checking session' });
  }
});

// Add other API routes as needed...

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve the React app for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
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
      console.log('🛠 Creating default admin user...');
      await db.createUser({
        username: 'admin',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        full_name: 'System Administrator',
        email: 'admin@example.com',
        is_admin: true,
      });
      console.log('✅ Admin user created');
    }
    app.listen(port, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://0.0.0.0:${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer(); 