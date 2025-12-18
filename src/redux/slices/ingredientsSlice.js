import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { referenceService } from '../../services';

const initialState = {
  ingredients: [],
  isLoading: false,
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const data = await referenceService.getIngredients();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default ingredientsSlice.reducer;
