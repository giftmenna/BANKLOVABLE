import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, initializeDatabase } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// 🟢 Route: Create user
app.post('/api/users', async (req, res) => {
  const userData = req.body;

  try {
    const createdUser = await db.createUser(userData);

    // ✅ Important: Send it inside `user` key (your frontend expects this)
    res.status(201).json({ user: createdUser });
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// 🟢 Route: Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.getUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error('❌ Error fetching users:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// 🟢 Route: Verify PIN
app.post('/api/users/:id/verify-pin', async (req, res) => {
  const { id } = req.params;
  const { pin } = req.body;

  try {
    const user = await db.getUserById(id);

    if (!user || !user.pin) {
      return res.status(404).json({ error: 'User or PIN not found' });
    }

    const bcrypt = await import('bcrypt');
    const isMatch = await bcrypt.compare(pin, user.pin);

    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect PIN' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ PIN verification error:', error.message);
    res.status(500).json({ error: 'Server error verifying PIN' });
  }
});

// 🛠 Initialize database tables if needed
initializeDatabase().catch((err) => {
  console.error('❌ Database init failed:', err);
  process.exit(1);
});

// 🔊 Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
