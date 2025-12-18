import api from './api';
import { tokenManager } from './tokenManager';
import { API_ENDPOINTS } from '../constants';
import '../models';

// Registers a new user account
const register = async (userData) => {
  const { data } = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  if (data.token) {
    tokenManager.setToken(data.token);
  }
  return data;
};

// Authenticates user and returns token
const login = async (credentials) => {
  const { data } = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  if (data.token) {
    tokenManager.setToken(data.token);
  }
  return data;
};

// Logs out the current user
const logout = async () => {
  await api.post(API_ENDPOINTS.AUTH.LOGOUT);
  tokenManager.removeToken();
};

// Fetches current authenticated user data
const getCurrentUser = async () => {
  const { data } = await api.get(API_ENDPOINTS.AUTH.CURRENT);
  return data;
};

export const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};
