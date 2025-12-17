import api, { tokenManager } from './api';
import { API_ENDPOINTS } from '../constants';
import '../models';

/**
 * Register a new user
 * @param {import('../models').RegisterRequest} userData
 * @returns {Promise<import('../models').AuthResponse>}
 */
const register = async (userData) => {
  const { data } = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  if (data.token) {
    tokenManager.setToken(data.token);
  }
  return data;
};

/**
 * Login with email and password
 * @param {import('../models').LoginRequest} credentials
 * @returns {Promise<import('../models').AuthResponse>}
 */
const login = async (credentials) => {
  const { data } = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  if (data.token) {
    tokenManager.setToken(data.token);
  }
  return data;
};

/**
 * Logout current user
 * @returns {Promise<void>}
 */
const logout = async () => {
  await api.post(API_ENDPOINTS.AUTH.LOGOUT);
  tokenManager.removeToken();
};

/**
 * Get current authenticated user
 * @returns {Promise<import('../models').UserResponse>}
 */
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
