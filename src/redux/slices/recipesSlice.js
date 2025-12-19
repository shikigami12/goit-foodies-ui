import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { recipeService } from '../../services';

const initialState = {
  recipes: [],
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

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await recipeService.searchRecipes(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = action.payload.recipes || [];
        state.pagination = {
          currentPage: action.payload.page || 1,
          totalPages: action.payload.totalPages || 1,
          limit: action.payload.perPage || 12,
        };
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters } = recipesSlice.actions;
export default recipesSlice.reducer;
