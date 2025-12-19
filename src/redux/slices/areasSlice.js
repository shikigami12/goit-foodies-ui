import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { referenceService } from '../../services';

const initialState = {
  areas: [],
  isLoading: false,
  error: null,
};

export const fetchAreas = createAsyncThunk(
  'areas/fetchAreas',
  async (_, { rejectWithValue }) => {
    try {
      const data = await referenceService.getAreas();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.areas = action.payload;
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default areasSlice.reducer;
