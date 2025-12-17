import api from './api';
import { tokenManager } from './tokenManager';
import { API_ENDPOINTS } from '../constants';
import '../models';

/**
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
 * @returns {Promise<void>}
 */
const logout = async () => {
  await api.post(API_ENDPOINTS.AUTH.LOGOUT);
  tokenManager.removeToken();
};

/**
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
