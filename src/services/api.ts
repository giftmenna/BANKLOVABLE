import axios from 'axios';

// Base URL configuration - use Vite proxy in development
const API_URL = import.meta.env.DEV ? '/api' : (import.meta.env.VITE_API_BASE_URL || '/api');

// User type definition
export type User = {
  user: any;
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

    const rawUser = response.data?.user || response.data?.data?.user;

    if (!rawUser) {
      throw new Error('User data missing in response');
    }

    const user: User = {
      ...rawUser,
      fullName: rawUser.full_name || rawUser.fullName || "",
      isAdmin: rawUser.is_admin ?? rawUser.isAdmin ?? false, // ✅ ensure boolean
    };

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
  const response = await api.get('/me');
  const user = response.data?.user;

  if (!user) {
    throw new Error("User data missing in response");
  }

  return {
    ...user,
    fullName: user.full_name ?? user.fullName ?? "",
    isAdmin: user.is_admin ?? user.isAdmin ?? false,
  };
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
  create: async (userData: Partial<User> & { isSignup?: boolean; password?: string; pin?: string }): Promise<User> => {
    try {
      console.log('🔍 [API] Creating user with data:', { 
        ...userData, 
        password: userData.password ? '***' : undefined,
        pin: userData.pin ? '***' : undefined
      });
      
      const data = { ...userData };
      if (data.isSignup) {
        delete data.isSignup;
        if (data.full_name && !data.full_name) {
          data.full_name = data.full_name;
          delete data.full_name;
        }
        console.log('📤 [API] Sending signup request to /signup');
        const response = await api.post('/signup', data);
        console.log('📥 [API] Signup response:', response.data);
        if (!response.data?.user) {
          throw new Error('User data missing in response');
        }
        return response.data.user;
      }
      console.log('📤 [API] Sending user creation request to /users');
      const response = await api.post('/users', data);
      console.log('📥 [API] User creation response:', response.data);
      if (!response.data?.user) {
        throw new Error('User data missing in response');
      }
      return response.data.user;
    } catch (error: any) {
      console.error('❌ [API] Failed to create user:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to create user');
    }
  },

  getAll: async (): Promise<User[]> => {
    try {
      console.log('🔍 [API] Fetching users...');
      const response = await api.get('/users');
      console.log('📥 [API] Users response:', response.data);
      if (!response.data) {
        throw new Error('No data received from server');
      }
      // Handle both response formats: direct array or wrapped in data property
      const users = response.data.data || response.data;
      console.log('✅ [API] Processed users:', users);
      return users;
    } catch (error) {
      console.error('❌ [API] Failed to fetch users:', error);
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

  updateAvatar: async (userId: string, file: File): Promise<User> => {
    try {
      console.log('🔄 [API] Starting avatar upload for user:', userId);
      console.log('📁 [API] File details:', {
        name: file.name,
        size: file.size,
        type: file.type
      });
      
      const formData = new FormData();
      formData.append('avatar', file);
      
      console.log('📤 [API] Sending request to server...');
      const response = await api.patch(`/users/${userId}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('✅ [API] Server response received:', {
        status: response.status,
        data: response.data
      });
      
      if (!response.data?.data?.avatar) {
        console.error('❌ [API] No avatar in response data:', response.data);
        throw new Error('Server did not return avatar path');
      }
      
      console.log('✅ [API] Avatar path from server:', response.data.data.avatar);
      
      // Return user object with avatar path
      return {
        id: userId,
        username: '',
        email: '',
        full_name: '',
        avatar: response.data.data.avatar,
      } as User;
    } catch (error: any) {
      console.error('❌ [API] Avatar upload failed:', error);
      console.error('❌ [API] Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
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
      // Handle both response formats: direct object or wrapped in data property
      const result = response.data.data || response.data;
      return result.valid;
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
      // Handle both response formats: direct array or wrapped in data property
      return response.data.data || response.data;
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return [];
    }
  },

  create: async (transactionData: Transaction): Promise<Transaction> => {
    try {
      console.log('📤 [API] Creating transaction:', transactionData);
      const response = await api.post('/transactions', transactionData);
      console.log('✅ [API] Transaction creation response:', response.data);
      
      if (!response.data) {
        throw new Error('No data received from server');
      }
      
      // Handle both response formats: direct object or wrapped in data property
      const transaction = response.data.data || response.data;
      console.log('✅ [API] Transaction created successfully:', transaction);
      return transaction;
    } catch (error: any) {
      console.error('❌ [API] Failed to create transaction:', error);
      console.error('❌ [API] Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
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
      // Handle both response formats: direct array or wrapped in data property
      return response.data.data || response.data;
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
      // Handle both response formats: direct object or wrapped in data property
      return response.data.data || response.data;
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