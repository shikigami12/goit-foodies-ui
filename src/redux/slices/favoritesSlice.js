import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
    addFavorite: (state, action) => {
      state.items.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
