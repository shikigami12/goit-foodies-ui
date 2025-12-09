import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import recipesReducer from './slices/recipesSlice';
import categoriesReducer from './slices/categoriesSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import areasReducer from './slices/areasSlice';
import usersReducer from './slices/usersSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    categories: categoriesReducer,
    ingredients: ingredientsReducer,
    areas: areasReducer,
    users: usersReducer,
    favorites: favoritesReducer,
  },
});
