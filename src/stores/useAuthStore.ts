import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '../lib/service/axios';
import cookies from 'js-cookies';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;

  // Profile actions
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: cookies.getItem('token') ? true : false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const response = await axiosInstance.post('/users/login', {
            email,
            password,
          });
          const { user, token } = response.data;

          // Store token in cookie (handled by backend in this case)
          if (token) {
            cookies.setItem('token', token);
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          set({
            error: err.response?.data?.message || 'Failed to login',
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (userData: RegisterData) => {
        try {
          set({ isLoading: true, error: null });
          const response = await axiosInstance.post(
            '/login/register',
            userData
          );
          const { user, token } = response.data;

          if (token) {
            cookies.setItem('token', token);
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          set({
            error: err.response?.data?.message || 'Failed to register',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          // await axiosInstance.post('/auth/logout');
          cookies.removeItem('token');
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          set({
            error: err.response?.data?.message || 'Failed to logout',
            isLoading: false,
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      updateProfile: async (data: Partial<User>) => {
        try {
          set({ isLoading: true, error: null });
          const response = await axiosInstance.patch('/auth/profile', data);
          set({
            user: response.data,
            isLoading: false,
          });
        } catch (error: unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          set({
            error: err.response?.data?.message || 'Failed to update profile',
            isLoading: false,
          });
          throw error;
        }
      },

      refreshUser: async () => {
        try {
          const token = cookies.getItem('token');
          if (!token) {
            set({ user: null, isAuthenticated: false });
            return;
          }

          set({ isLoading: true, error: null });
          const response = await axiosInstance.get('/auth/me');
          set({
            user: response.data,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          set({
            user: null,
            isAuthenticated: false,
            error: err.response?.data?.message || 'Failed to refresh user',
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      // Only persist these fields
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
