import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
