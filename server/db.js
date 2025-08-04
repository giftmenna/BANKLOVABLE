import dotenv from 'dotenv';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Create a new pool using the Neon database connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    require: true,
  },
  max: parseInt(process.env.DB_MAX_CONNECTIONS) || 5,
  idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT) || 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('connect', () => {
  console.log('✅ Connected to Neon PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database pool error:', err.message, err.stack);
});

export const db = {
  pool,

  // Create new user
  createUser: async ({ full_name, username, email, password, phone = null, pin = null, balance = 100, is_admin = false }) => {
    console.log('📝 Creating user with details:', {
      full_name,
      username,
      email,
      phone,
      pin: pin ? '[REDACTED]' : null,
      balance,
      is_admin,
    });

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Check if user already exists
      console.log('🔍 Checking for existing user...');
      const existingUser = await client.query(
        'SELECT username, email FROM users WHERE username = $1 OR email = $2',
        [username, email]
      );

      if (existingUser.rows.length > 0) {
        console.log('❌ User already exists:', existingUser.rows[0]);
        throw new Error(
          existingUser.rows[0].username === username
            ? 'Username already taken'
            : 'Email already registered'
        );
      }

      console.log('🔐 Hashing password...');
      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedPin = pin ? await bcrypt.hash(pin, 10) : null;

      console.log('📝 Inserting user into database...');
      const result = await client.query(
        `INSERT INTO users (
          id, full_name, username, email, password, 
          phone, pin, status, balance, is_admin, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
        RETURNING id, full_name, username, email, phone, status, balance, is_admin, created_at`,
        [
          uuidv4(),
          full_name,
          username,
          email,
          hashedPassword,
          phone,
          hashedPin,
          'Active',
          balance,
          is_admin,
        ]
      );

      await client.query('COMMIT');
      console.log('✅ User created successfully:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('❌ Error creating user:', error.message, error.stack);
      throw error;
    } finally {
      client.release();
    }
  },

  // Get user by username
  getUserByUsername: async (username) => {
    console.log('🔍 Getting user by username:', username);
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    console.log('✅ User fetch result:', result.rows[0] ? 'Found' : 'Not found');
    return result.rows[0];
  },

  // Get user by ID
  getUserById: async (userId) => {
    console.log('🔍 Getting user by ID:', userId);
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );
    console.log('✅ User fetch result:', result.rows[0] ? 'Found' : 'Not found');
    return result.rows[0];
  },

  // Get all users
  getUsers: async () => {
    console.log('🔍 Fetching all users...');
    const result = await pool.query(
      `SELECT 
        id, full_name, username, email, phone,
        status, balance, is_admin, avatar,
        created_at, last_login 
       FROM users 
       ORDER BY username ASC`
    );
    console.log('✅ Fetched users:', result.rows.length);
    return result.rows;
  },

  // Delete user
  deleteUser: async (userId) => {
    console.log(`🔍 Deleting user with ID: ${userId}`);
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query(
        'DELETE FROM users WHERE id = $1 RETURNING id',
        [userId]
      );
      if (result.rowCount === 0) {
        throw new Error('User not found');
      }
      await client.query('COMMIT');
      console.log(`✅ User deleted: ${userId}`);
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('❌ Error deleting user:', error.message, error.stack);
      throw error;
    } finally {
      client.release();
    }
  },

  // Update user status
  updateUserStatus: async (userId, status) => {
    console.log(`🔍 Updating status for user ID: ${userId} to ${status}`);
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query(
        `UPDATE users SET status = $2 WHERE id = $1 
         RETURNING id, full_name, username, email, phone, status, balance, is_admin`,
        [userId, status]
      );
      if (result.rowCount === 0) {
        throw new Error('User not found');
      }
      await client.query('COMMIT');
      console.log(`✅ User status updated: ${userId}`);
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('❌ Error updating user status:', error.message, error.stack);
      throw error;
    } finally {
      client.release();
    }
  },

  // Update user balance
  updateUserBalance: async (userId, balance) => {
    console.log(`🔍 Updating balance for user ID: ${userId} to ${balance}`);
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query(
        `UPDATE users SET balance = $2 WHERE id = $1 
         RETURNING id, full_name, username, email, phone, status, balance, is_admin`,
        [userId, balance]
      );
      if (result.rowCount === 0) {
        throw new Error('User not found');
      }
      await client.query('COMMIT');
      console.log(`✅ User balance updated: ${userId}`);
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('❌ Error updating user balance:', error.message, error.stack);
      throw error;
    } finally {
      client.release();
    }
  },

  // Update user avatar
  updateUserAvatar: async (userId, avatar) => {
    console.log(`🔍 Updating avatar for user ID: ${userId}`);
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query(
        `UPDATE users SET avatar = $2 WHERE id = $1 
         RETURNING id, full_name, username, email, phone, status, balance, is_admin, avatar`,
        [userId, avatar]
      );
      if (result.rowCount === 0) {
        throw new Error('User not found');
      }
      await client.query('COMMIT');
      console.log(`✅ User avatar updated: ${userId}`);
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('❌ Error updating user avatar:', error.message, error.stack);
      throw error;
    } finally {
      client.release();
    }
  },

  // Delete user avatar
  deleteUserAvatar: async (userId) => {
    console.log(`🔍 Deleting avatar for user ID: ${userId}`);
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query(
        `UPDATE users SET avatar = NULL WHERE id = $1 
         RETURNING id, full_name, username, email, phone, status, balance, is_admin`,
        [userId]
      );
      if (result.rowCount === 0) {
        throw new Error('User not found');
      }
      await client.query('COMMIT');
      console.log(`✅ User avatar deleted: ${userId}`);
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('❌ Error deleting user avatar:', error.message, error.stack);
      throw error;
    } finally {
      client.release();
    }
  },

  // Update user's last login
  updateUserLastLogin: async (userId) => {
    console.log('🔄 Updating last login for user ID:', userId);
    const result = await pool.query(
      'UPDATE users SET last_login = NOW() WHERE id = $1',
      [userId]
    );
    console.log('✅ Last login updated');
    return result;
  },

  // Create transaction
  createTransaction: async ({ user_id, type, amount, description = null, date_time, recipient_details = null }) => {
    console.log('📝 Creating transaction:', { user_id, type, amount, date_time });
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Get user to update balance
      const userResult = await client.query('SELECT * FROM users WHERE id = $1', [user_id]);
      if (userResult.rows.length === 0) {
        throw new Error('User not found');
      }

      const user = userResult.rows[0];
      let newBalance = parseFloat(user.balance);

      // Update balance based on transaction type
      if (type === 'Deposit') {
        newBalance += parseFloat(amount);
      } else if (type === 'Withdrawal') {
        if (newBalance < parseFloat(amount)) {
          throw new Error('Insufficient funds');
        }
        newBalance -= parseFloat(amount);
      } else if (type === 'Transfer' || type === 'Bill Pay') {
        if (newBalance < parseFloat(amount)) {
          throw new Error('Insufficient funds');
        }
        newBalance -= parseFloat(amount);
      }

      // Update user balance
      await client.query('UPDATE users SET balance = $1 WHERE id = $2', [newBalance, user_id]);

      // Create transaction record
      const transactionId = uuidv4();
      const result = await client.query(
        `INSERT INTO transactions (
          id, user_id, type, amount, description, date_time, recipient_details, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        RETURNING id, user_id, type, amount, description, date_time, recipient_details`,
        [transactionId, user_id, type, amount, description, date_time, recipient_details]
      );

      await client.query('COMMIT');

      // Get the username for the response
      const usernameResult = await pool.query('SELECT username FROM users WHERE id = $1', [user_id]);
      const username = usernameResult.rows[0]?.username;

      const transaction = {
        ...result.rows[0],
        username,
        balance: newBalance
      };

      console.log('✅ Transaction created successfully:', transaction.id);
      return transaction;
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('❌ Error creating transaction:', error.message, error.stack);
      throw error;
    } finally {
      client.release();
    }
  },

  // Get all transactions
  getTransactions: async () => {
    console.log('🔍 Fetching all transactions...');
    const result = await pool.query(
      `SELECT t.*, u.username 
       FROM transactions t
       JOIN users u ON t.user_id = u.id
       ORDER BY t.date_time DESC`
    );
    console.log('✅ Fetched transactions:', result.rows.length);
    return result.rows;
  },

  // Get transactions for a specific user
  getUserTransactions: async (userId) => {
    console.log(`🔍 Fetching transactions for user ID: ${userId}`);
    const result = await pool.query(
      `SELECT t.*, u.username 
       FROM transactions t
       JOIN users u ON t.user_id = u.id
       WHERE t.user_id = $1
       ORDER BY t.date_time DESC`,
      [userId]
    );
    console.log(`✅ Fetched ${result.rows.length} transactions for user ${userId}`);
    return result.rows;
  },

  // Delete transaction
  deleteTransaction: async (transactionId) => {
    console.log(`🔍 Deleting transaction with ID: ${transactionId}`);
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Get the transaction details to reverse the balance change
      const transactionResult = await client.query(
        'SELECT * FROM transactions WHERE id = $1',
        [transactionId]
      );

      if (transactionResult.rowCount === 0) {
        throw new Error('Transaction not found');
      }

      const transaction = transactionResult.rows[0];

      // Get the user to update their balance
      const userResult = await client.query('SELECT * FROM users WHERE id = $1', [transaction.user_id]);
      if (userResult.rows.length === 0) {
        throw new Error('User not found');
      }

      const user = userResult.rows[0];
      let newBalance = parseFloat(user.balance);

      // Reverse the transaction effect on balance
      if (transaction.type === 'Deposit') {
        newBalance -= parseFloat(transaction.amount);
      } else if (transaction.type === 'Withdrawal' || transaction.type === 'Transfer' || type === 'Bill Pay') {
        newBalance += parseFloat(transaction.amount);
      }

      // Update user balance
      await client.query('UPDATE users SET balance = $1 WHERE id = $2', [newBalance, transaction.user_id]);

      // Delete the transaction
      await client.query('DELETE FROM transactions WHERE id = $1', [transactionId]);

      await client.query('COMMIT');
      console.log(`✅ Transaction deleted: ${transactionId}`);
      return { success: true, id: transactionId };
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('❌ Error deleting transaction:', error.message, error.stack);
      throw error;
    } finally {
      client.release();
    }
  },

  // Get or create settings
  getSettings: async () => {
    console.log('🔍 Fetching system settings...');
    const result = await pool.query('SELECT * FROM settings WHERE id = 1');

    if (result.rows.length === 0) {
      // Create default settings if they don't exist
      const defaultSettings = {
        systemName: 'Nivalus Banking System',
        maintenance: false,
        allowNewUsers: true,
        contactEmail: 'admin@nivalus.com'
      };

      await pool.query(
        `INSERT INTO settings (id, system_name, maintenance, allow_new_users, contact_email)
         VALUES (1, $1, $2, $3, $4)`,
        [defaultSettings.systemName, defaultSettings.maintenance, defaultSettings.allowNewUsers, defaultSettings.contactEmail]
      );

      console.log('✅ Created default settings');
      return defaultSettings;
    }

    // Transform from snake_case to camelCase
    const settings = {
      systemName: result.rows[0].system_name,
      maintenance: result.rows[0].maintenance,
      allowNewUsers: result.rows[0].allow_new_users,
      contactEmail: result.rows[0].contact_email
    };

    console.log('✅ Fetched settings');
    return settings;
  },

  // Update settings
  updateSettings: async (settingsData) => {
    console.log('🔄 Updating system settings');
    const { systemName, maintenance, allowNewUsers, contactEmail } = settingsData;

    const result = await pool.query(
      `UPDATE settings 
       SET system_name = $1, maintenance = $2, allow_new_users = $3, contact_email = $4
       WHERE id = 1
       RETURNING *`,
      [systemName, maintenance, allowNewUsers, contactEmail]
    );

    if (result.rowCount === 0) {
      // Create settings if they don't exist
      await pool.query(
        `INSERT INTO settings (id, system_name, maintenance, allow_new_users, contact_email)
         VALUES (1, $1, $2, $3, $4)`,
        [systemName, maintenance, allowNewUsers, contactEmail]
      );
    }

    console.log('✅ Settings updated');
    return settingsData;
  },
};

// Define initializeDatabase function outside the db object
export const initializeDatabase = async () => {
  const client = await pool.connect();
  try {
    console.log('🛠 Initializing database schema...');

    // Drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS transactions CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS settings CASCADE;
    `);

    // Create tables in correct order
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        pin VARCHAR(255),
        status VARCHAR(20) DEFAULT 'Active',
        balance DECIMAL(10,2) DEFAULT 0.00,
        is_admin BOOLEAN DEFAULT false,
        avatar TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        last_login TIMESTAMP WITH TIME ZONE
      );

      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(20) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        description TEXT,
        date_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        recipient_details TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
      CREATE INDEX IF NOT EXISTS idx_transactions_date_time ON transactions(date_time);
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY,
        system_name VARCHAR(100) NOT NULL,
        maintenance BOOLEAN DEFAULT false,
        allow_new_users BOOLEAN DEFAULT true,
        contact_email VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    console.log('✅ Database schema initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  } finally {
    client.release();
  }
};

export default db;