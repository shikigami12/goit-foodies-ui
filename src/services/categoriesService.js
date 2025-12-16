import api from './api';
import { API_ENDPOINTS } from '../constants';
import '../models';

/**
 * Get all categories
 * @returns {Promise<import('../models').Category[]>} Array of categories
 */
const getCategories = async () => {
  const response = await api.get(API_ENDPOINTS.CATEGORIES);
  return response.data;
};

export const categoriesService = {
  getCategories,
};