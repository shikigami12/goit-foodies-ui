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

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleSuccess = (state, action) => {
  state.isLoading = false;
  state.recipes = action.payload.recipes || [];
  state.pagination = {
    currentPage: action.payload.page || 1,
    totalPages: action.payload.totalPages || 1,
    limit: action.payload.limit || 12,
  };
};

const handleReject = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
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

export const fetchOwnRecipes = createAsyncThunk(
  'recipes/fetchOwnRecipes',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await recipeService.getOwnRecipes(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFavoriteRecipes = createAsyncThunk(
  'recipes/fetchFavoriteRecipes',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await recipeService.getFavorites(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserRecipes = createAsyncThunk(
  'recipes/fetchUserRecipes',
  async ({ userId, params = {} }, { rejectWithValue }) => {
    try {
      const data = await recipeService.getRecipesByUserId(userId, params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRecipeThunk = createAsyncThunk(
  'recipes/deleteRecipe',
  async (id, { rejectWithValue }) => {
    try {
      await recipeService.deleteRecipe(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFavoriteThunk = createAsyncThunk(
  'recipes/removeFavorite',
  async (id, { rejectWithValue }) => {
    try {
      await recipeService.removeFavorite(id);
      return id;
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
  extraReducers: builder => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, handleSuccess)
      .addCase(fetchRecipes.rejected, handleReject)

      .addCase(fetchOwnRecipes.pending, handlePending)
      .addCase(fetchOwnRecipes.fulfilled, handleSuccess)
      .addCase(fetchOwnRecipes.rejected, handleReject)

      .addCase(fetchFavoriteRecipes.pending, handlePending)
      .addCase(fetchFavoriteRecipes.fulfilled, handleSuccess)
      .addCase(fetchFavoriteRecipes.rejected, handleReject)

      .addCase(fetchUserRecipes.pending, handlePending)
      .addCase(fetchUserRecipes.fulfilled, handleSuccess)
      .addCase(fetchUserRecipes.rejected, handleReject)

      .addCase(deleteRecipeThunk.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter(
          r => (r._id || r.id) !== action.payload
        );
        state.pagination.total -= 1;
      })
      .addCase(removeFavoriteThunk.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter(
          r => (r._id || r.id) !== action.payload
        );
        state.pagination.total -= 1;
      });
  },
});

export const { setFilters } = recipesSlice.actions;
export default recipesSlice.reducer;
