import axios from 'axios';
import cookies from 'js-cookies';
import { toast } from 'sonner';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10 * 60 * 1000, // 10 minutes
});

// Add a request interceptor to set the language
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = cookies.getItem('token');

    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('error..', error);
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized access, redirecting to login...');
      cookies.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/admin-panel/login';
    }

    if (error.response && error.response.status === 400) {
      toast.error(error.response.data.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
