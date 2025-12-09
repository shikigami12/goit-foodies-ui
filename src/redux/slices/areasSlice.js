import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    setAreas: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setAreas } = areasSlice.actions;
export default areasSlice.reducer;
