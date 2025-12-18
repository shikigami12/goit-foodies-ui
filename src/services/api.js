import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { tokenManager } from './tokenManager';

/**
 * Axios instance configured for the Foodies API
 *
 * Features:
 * - Auto-attaches JWT token to requests
 * - Handles 401 errors with token cleanup
 * - Normalizes error responses
 * - 10 second timeout
 *
 * Usage:
 *   import api from './api';
 *
 *   // GET request
 *   const { data } = await api.get('/recipes');
 *
 *   // POST request
 *   const { data } = await api.post('/auth/login', { email, password });
 *
 *   // Multipart form data (file upload)
 *   const formData = new FormData();
 *   formData.append('avatar', file);
 *   const { data } = await api.patch('/users/avatar', formData, {
 *     headers: { 'Content-Type': 'multipart/form-data' }
 *   });
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - auto-attach auth token
api.interceptors.request.use(
  config => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor - error handling
api.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;

    // Handle 401 Unauthorized - token expired or invalid
    if (response?.status === 401) {
      tokenManager.removeToken();
      // Only redirect if not already on home page
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }

    // Normalize error for consistent handling across the app
    const normalizedError = {
      status: response?.status || 0,
      message:
        response?.data?.message || error.message || 'Something went wrong',
      data: response?.data || null,
      originalError: error,
    };

    return Promise.reject(normalizedError);
  }
);

/**
 * Helper to build query string from params object
 * Filters out undefined/null values
 *
 * Usage:
 *   const query = buildQueryString({ page: 1, limit: 10, category: undefined });
 *   // Returns: "page=1&limit=10"
 */
export const buildQueryString = params => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Helper to create FormData from object
 * Handles file uploads and JSON stringification for arrays/objects
 *
 * Usage:
 *   const formData = createFormData({
 *     title: 'My Recipe',
 *     ingredients: [{ id: '1', measure: '100g' }],
 *     thumb: fileObject
 *   });
 */
export const createFormData = data => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value) || typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
};

export default api;
[
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    measure: 'string',
    ingredient: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'string',
      img: 'string',
    },
  },
];
