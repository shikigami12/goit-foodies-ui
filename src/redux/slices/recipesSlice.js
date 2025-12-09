import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  currentRecipe: null,
  popularRecipes: [],
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    limit: 12,
  },
  filters: {
    category: null,
    ingredient: null,
    area: null,
  },
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.items = action.payload;
    },
    setCurrentRecipe: (state, action) => {
      state.currentRecipe = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
});

export const { setRecipes, setCurrentRecipe, setFilters, setPagination } = recipesSlice.actions;
export default recipesSlice.reducer;
