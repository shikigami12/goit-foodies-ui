import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUserProfile: null,
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUserProfile: (state, action) => {
      state.currentUserProfile = action.payload;
    },
  },
});

export const { setCurrentUserProfile } = usersSlice.actions;
export default usersSlice.reducer;
