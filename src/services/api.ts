import axios from 'axios';

// Base URL configuration - use Vite proxy in development
const API_URL = import.meta.env.DEV ? '/api' : (import.meta.env.VITE_API_BASE_URL || '/api');

// User type definition
export type User = {
  id: string;
  username: string;
  email: string;
  full_name: string;
  balance?: number;
  status?: 'Active' | 'Inactive';
  is_admin?: boolean;
  avatar?: string;
  created_at?: string;
  last_login?: string;
};

// Transaction type definition
export type Transaction = {
  id?: string;
  user_id: string;
  type: 'Deposit' | 'Withdrawal' | 'Transfer' | 'Bill Pay';
  amount: number;
  date_time: string;
};

// Configure axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: import.meta.env.VITE_API_TIMEOUT || 30000,
  withCredentials: true,
  validateStatus: (status) => status < 500,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      window.location.href = '/login';
    } else if (error.response?.status >= 400 && error.response?.status < 500) {
      console.warn('Client error:', error.response?.data?.message);
    } else {
      console.error('Server error:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Authentication API methods
 */
export const auth = {
  login: async (username: string, password: string): Promise<User> => {
  try {
    console.log('🔍 [FRONTEND] Login attempt for:', username);
    const response = await api.post('/login', { username, password });

    const user = response.data?.user || response.data?.data?.user;

    if (!user) {
      throw new Error('User data missing in response');
    }

    console.log('✅ [FRONTEND] Login success:', user);
    return user;
  } catch (error: any) {
    console.error('❌ [FRONTEND] Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
  }
},


  logout: async (): Promise<void> => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get('/me');
      if (!response.data?.user) {
        throw new Error('User data missing in response');
      }
      return response.data.user;
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      throw error;
    }
  },

  isLoggedIn: async (): Promise<boolean> => {
    try {
      const response = await api.get('/session');
      return response.data?.isLoggedIn || false;
    } catch (error) {
      console.error('Session check error:', error);
      return false;
    }
  },

  updateUser: async (userId: string, updates: Partial<User>): Promise<User> => {
    try {
      const response = await api.patch(`/users/${userId}`, updates);
      if (!response.data?.user) {
        throw new Error('User data missing in response');
      }
      return response.data.user;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  },
};

/**
 * User management API methods
 */
export const users = {
  create: async (userData: Partial<User> & { isSignup?: boolean }): Promise<User> => {
    try {
      const data = { ...userData };
      if (data.isSignup) {
        delete data.isSignup;
        if (data.full_name && !data.full_name) {
          data.full_name = data.full_name;
          delete data.full_name;
        }
        const response = await api.post('/signup', data);
        if (!response.data?.user) {
          throw new Error('User data missing in response');
        }
        return response.data.user;
      }
      const response = await api.post('/users', data);
      if (!response.data?.user) {
        throw new Error('User data missing in response');
      }
      return response.data.user;
    } catch (error: any) {
      console.error('Failed to create user:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to create user');
    }
  },

  getAll: async (): Promise<User[]> => {
    try {
      const response = await api.get('/users');
      if (!response.data) {
        throw new Error('No data received from server');
      }
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  },

  delete: async (userId: string): Promise<void> => {
    try {
      await api.delete(`/users/${userId}`);
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  },

  updateStatus: async (userId: string, status: 'Active' | 'Inactive'): Promise<User> => {
    try {
      const response = await api.patch(`/users/${userId}/status`, { status });
      if (!response.data?.user) {
        throw new Error('User data missing in response');
      }
      return response.data.user;
    } catch (error) {
      console.error('Failed to update user status:', error);
      throw error;
    }
  },

  updateBalance: async (userId: string, balance: number): Promise<User> => {
    try {
      const response = await api.patch(`/users/${userId}/balance`, { balance });
      if (!response.data?.user) {
        throw new Error('User data missing in response');
      }
      return response.data.user;
    } catch (error) {
      console.error('Failed to update user balance:', error);
      throw error;
    }
  },

  getById: async (userId: string): Promise<User> => {
    try {
      const response = await api.get(`/users/${userId}`);
      if (!response.data?.user) {
        throw new Error('User data missing in response');
      }
      return response.data.user;
    } catch (error) {
      console.error('Failed to fetch user by ID:', error);
      throw error;
    }
  },

  updateAvatar: async (userId: string, data: { avatar: string }): Promise<User> => {
    try {
      console.log('🔄 [FRONTEND] Updating avatar for user:', userId);
      const response = await api.patch(`/users/${userId}/avatar`, data);
      if (!response.data?.user) {
        throw new Error('User data missing in response');
      }
      console.log('✅ [FRONTEND] Avatar update response:', response.data);
      return response.data.user;
    } catch (error: any) {
      console.error('❌ [FRONTEND] Failed to update avatar:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to update avatar');
    }
  },

  deleteAvatar: async (userId: string): Promise<void> => {
    try {
      await api.delete(`/users/${userId}/avatar`);
    } catch (error) {
      console.error('Failed to delete avatar:', error);
      throw error;
    }
  },

  verifyPin: async (userId: string, pin: string): Promise<boolean> => {
    try {
      console.log('🔍 [FRONTEND] Verifying PIN for user:', userId);
      const response = await api.post(`/users/${userId}/verify-pin`, { pin });
      if (!response.data) {
        throw new Error('No data received from server');
      }
      console.log('✅ [FRONTEND] PIN verification response:', response.data);
      return response.data.valid;
    } catch (error: any) {
      console.error('❌ [FRONTEND] Failed to verify PIN:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to verify PIN');
    }
  },
};

/**
 * Transactions API methods
 */
export const transactions = {
  getAll: async (): Promise<Transaction[]> => {
    try {
      const response = await api.get('/transactions');
      if (!response.data) {
        throw new Error('No data received from server');
      }
      return response.data;
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return [];
    }
  },

  create: async (transactionData: Transaction): Promise<Transaction> => {
    try {
      const response = await api.post('/transactions', transactionData);
      if (!response.data) {
        throw new Error('No data received from server');
      }
      return response.data;
    } catch (error) {
      console.error('Failed to create transaction:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/transactions/${id}`);
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      throw error;
    }
  },

  getByUserId: async (userId: string): Promise<Transaction[]> => {
    try {
      const response = await api.get(`/users/${userId}/transactions`);
      if (!response.data) {
        throw new Error('No data received from server');
      }
      return response.data;
    } catch (error) {
      console.error('Failed to fetch transactions for user:', error);
      throw error;
    }
  },
};

/**
 * Settings API methods
 */
export const settings = {
  getAll: async (): Promise<any> => {
    try {
      const response = await api.get('/settings');
      if (!response.data) {
        throw new Error('No data received from server');
      }
      return response.data;
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      throw error;
    }
  },

  update: async (settingsData: any): Promise<any> => {
    try {
      const response = await api.patch('/settings', settingsData);
      if (!response.data) {
        throw new Error('No data received from server');
      }
      return response.data;
    } catch (error) {
      console.error('Failed to update settings:', error);
      throw error;
    }
  },
};

export default {
  auth,
  users,
  settings,
  transactions,
  baseURL: API_URL,
};