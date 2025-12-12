import api, { buildQueryString, createFormData } from './api';
import { API_ENDPOINTS } from '../constants';
import '../models';

/**
 * Search recipes with filters and pagination
 * @param {import('../models').RecipeSearchParams} [params]
 * @returns {Promise<import('../models').RecipesPaginatedResponse>}
 */
const searchRecipes = async (params = {}) => {
  const query = buildQueryString(params);
  const { data } = await api.get(`${API_ENDPOINTS.RECIPES.BASE}${query}`);
  return data;
};

/**
 * Get recipe by ID with full details
 * @param {string} id - Recipe UUID
 * @returns {Promise<import('../models').RecipeDetail>}
 */
const getRecipeById = async (id) => {
  const { data } = await api.get(API_ENDPOINTS.RECIPES.BY_ID(id));
  return data;
};

/**
 * Get popular recipes (by favorites count)
 * @returns {Promise<import('../models').PopularRecipe[]>}
 */
const getPopularRecipes = async () => {
  const { data } = await api.get(API_ENDPOINTS.RECIPES.POPULAR);
  return data;
};

/**
 * Get current user's own recipes
 * @param {import('../models').PaginationParams} [params]
 * @returns {Promise<import('../models').RecipesPaginatedResponse>}
 */
const getOwnRecipes = async (params = {}) => {
  const query = buildQueryString(params);
  const { data } = await api.get(`${API_ENDPOINTS.RECIPES.OWN}${query}`);
  return data;
};

/**
 * Create a new recipe
 * @param {import('../models').CreateRecipeRequest & { thumb?: File }} recipeData
 * @returns {Promise<import('../models').RecipeDetail>}
 */
const createRecipe = async (recipeData) => {
  const formData = createFormData(recipeData);
  const { data } = await api.post(API_ENDPOINTS.RECIPES.BASE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

/**
 * Delete own recipe
 * @param {string} id - Recipe UUID
 * @returns {Promise<void>}
 */
const deleteRecipe = async (id) => {
  await api.delete(API_ENDPOINTS.RECIPES.BY_ID(id));
};

/**
 * Get current user's favorite recipes
 * @param {import('../models').PaginationParams} [params]
 * @returns {Promise<import('../models').RecipesPaginatedResponse>}
 */
const getFavorites = async (params = {}) => {
  const query = buildQueryString(params);
  const { data } = await api.get(`${API_ENDPOINTS.RECIPES.FAVORITES}${query}`);
  return data;
};

/**
 * Add recipe to favorites
 * @param {string} recipeId - Recipe UUID
 * @returns {Promise<import('../models').MessageResponse>}
 */
const addFavorite = async (recipeId) => {
  const { data } = await api.post(API_ENDPOINTS.RECIPES.FAVORITE(recipeId));
  return data;
};

/**
 * Remove recipe from favorites
 * @param {string} recipeId - Recipe UUID
 * @returns {Promise<void>}
 */
const removeFavorite = async (recipeId) => {
  await api.delete(API_ENDPOINTS.RECIPES.FAVORITE(recipeId));
};

export const recipeService = {
  searchRecipes,
  getRecipeById,
  getPopularRecipes,
  getOwnRecipes,
  createRecipe,
  deleteRecipe,
  getFavorites,
  addFavorite,
  removeFavorite,
};
