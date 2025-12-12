import api from './api';
import { API_ENDPOINTS } from '../constants';
import '../models';

/**
 * Get all categories
 * @returns {Promise<import('../models').Category[]>}
 */
const getCategories = async () => {
  const { data } = await api.get(API_ENDPOINTS.CATEGORIES);
  return data;
};

/**
 * Get all areas
 * @returns {Promise<import('../models').Area[]>}
 */
const getAreas = async () => {
  const { data } = await api.get(API_ENDPOINTS.AREAS);
  return data;
};

/**
 * Get all ingredients
 * @returns {Promise<import('../models').Ingredient[]>}
 */
const getIngredients = async () => {
  const { data } = await api.get(API_ENDPOINTS.INGREDIENTS);
  return data;
};

/**
 * Get all testimonials
 * @returns {Promise<import('../models').TestimonialResponse[]>}
 */
const getTestimonials = async () => {
  const { data } = await api.get(API_ENDPOINTS.TESTIMONIALS);
  return data;
};

export const referenceService = {
  getCategories,
  getAreas,
  getIngredients,
  getTestimonials,
};
