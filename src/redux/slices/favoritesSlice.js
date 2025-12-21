import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    favorites: [],
    isLoading: false,
    error: null,
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavorites: (state, action) => {
            state.favorites = action.payload;
        },
        addToFavorites: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter((item) => item !== action.payload);
        },
        clearFavorites: (state) => {
            state.favorites = [];
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const { setFavorites, addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;

// Persist config
const persistConfig = {
    key: 'favoriteRecipes',
    storage,
};

export default persistReducer(persistConfig, favoritesSlice.reducer);