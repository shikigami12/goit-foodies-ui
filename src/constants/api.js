export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
    LOGOUT: '/auth/logout',
    CURRENT: '/auth/current',
  },
  RECIPES: {
    ALL: '/recipes',
    BY_ID: (id) => `/recipes/${id}`,
    BY_CATEGORY: '/recipes/category',
    POPULAR: '/recipes/popular',
    CREATE: '/recipes',
    DELETE: (id) => `/recipes/${id}`,
  },
  CATEGORIES: '/categories',
  INGREDIENTS: '/ingredients',
  AREAS: '/areas',
  USERS: {
    BY_ID: (id) => `/users/${id}`,
    RECIPES: (id) => `/users/${id}/recipes`,
    FAVORITES: (id) => `/users/${id}/favorites`,
    FOLLOWERS: (id) => `/users/${id}/followers`,
    FOLLOWING: (id) => `/users/${id}/following`,
    FOLLOW: (id) => `/users/${id}/follow`,
    UNFOLLOW: (id) => `/users/${id}/unfollow`,
  },
  FAVORITES: {
    ADD: '/favorites',
    REMOVE: (id) => `/favorites/${id}`,
  },
  TESTIMONIALS: '/testimonials',
};
