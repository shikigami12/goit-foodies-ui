import api from './api';
import { API_ENDPOINTS } from '../constants';

export const authService = {
  signup: async (userData) => {
    const { data } = await api.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  signin: async (credentials) => {
    const { data } = await api.post(API_ENDPOINTS.AUTH.SIGNIN, credentials);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  logout: async () => {
    await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const { data } = await api.get(API_ENDPOINTS.AUTH.CURRENT);
    return data;
  },
};
