import api, { tokenManager } from './api';
import { API_ENDPOINTS } from '../constants';
import '../models';

/**
 * Register a new user.
 * Handles token persistence when backend returns a JWT.
 * @param {import('../models').RegisterRequest} userData - User registration data
 * @returns {Promise<import('../models').AuthResponse>} Auth response with user and token
 * @throws {Error} If registration fails
 */
const register = async (userData) => {
  const { data } = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  if (data.token) {
    tokenManager.setToken(data.token);
  }
  return data;
};

/**
 * Login with email and password.
 * Handles token persistence when backend returns a JWT.
 * @param {import('../models').LoginRequest} credentials - Login credentials
 * @returns {Promise<import('../models').AuthResponse>} Auth response with user and token
 * @throws {Error} If login fails
 */
const login = async (credentials) => {
  const { data } = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  if (data.token) {
    tokenManager.setToken(data.token);
  }
  return data;
};

/**
 * Logout current user.
 * Always clears the local token after a successful API call.
 * @returns {Promise<void>}
 * @throws {Error} If logout fails (but local token is still cleared)
 */
const logout = async () => {
  await api.post(API_ENDPOINTS.AUTH.LOGOUT);
  tokenManager.removeToken();
};

/**
 * Get current authenticated user.
 * @returns {Promise<import('../models').UserResponse>} Current user data
 * @throws {Error} If user fetch fails
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
