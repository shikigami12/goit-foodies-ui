export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },

  // Users
  USERS: {
    CURRENT: '/users/current',
    BY_ID: id => `/users/${id}`,
    AVATAR: '/users/avatar',
    FOLLOWERS: id => `/users/${id}/followers`,
    FOLLOWING: '/users/following',
    FOLLOW: id => `/users/${id}/follow`,
    UNFOLLOW: id => `/users/${id}/follow`,
  },

  // Recipes
  RECIPES: {
    BASE: '/recipes',
    BY_ID: id => `/recipes/${id}`,
    POPULAR: '/recipes/popular',
    OWN: '/recipes/own',
    BY_USER: userId => `/recipes/user/${userId}`,
    FAVORITES: '/recipes/favorites',
    FAVORITE: id => `/recipes/${id}/favorite`,
  },

  // Reference data
  CATEGORIES: '/categories',
  AREAS: '/areas',
  INGREDIENTS: '/ingredients',
  TESTIMONIALS: '/testimonials',
};
