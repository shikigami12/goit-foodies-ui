import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userService } from '../../services';

const initialState = {
  currentUserProfile: null,
  isLoading: false,
  error: null,
};

const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message || error?.message || fallbackMessage;

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleUserSuccess = (state, action) => {
  state.isLoading = false;
  state.currentUserProfile = action.payload;
  state.error = null;
};

const handleUserFailure = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const clearUserState = state => {
  state.currentUserProfile = null;
  state.error = null;
};

export const getCurrentUser = createAsyncThunk(
  'users/current',
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getCurrentUser();
    } catch (error) {
      console.error(error);
      return rejectWithValue(getErrorMessage(error, 'get current user failed'));
    }
  }
);

export const getUserById = createAsyncThunk(
  'users/byId',
  async (id, { rejectWithValue }) => {
    try {
      return await userService.getUserById(id);
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        getErrorMessage(error, `get user with Id: ${id} failed`)
      );
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'users/updateAvatar',
  async (file, { rejectWithValue }) => {
    try {
      return await userService.updateAvatar(file);
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        getErrorMessage(error, `get user with Id: ${id} failed`)
      );
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUserProfile: (state, action) => {
      state.currentUserProfile = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrentUser.pending, handlePending)
      .addCase(getCurrentUser.fulfilled, handleUserSuccess)
      .addCase(getCurrentUser.rejected, handleUserFailure)
      .addCase(getUserById.pending, handlePending)
      .addCase(getUserById.fulfilled, handleUserSuccess)
      .addCase(getUserById.rejected, handleUserFailure)
      .addCase(updateAvatar.pending, handlePending)
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        // console.log(payload);
        // state.currentUserProfile = {
        //   ...state.currentUserProfile,
        //   avatar: payload.avatar,
        // };

        state.currentUserProfile.avatar = payload.avatar;
      })
      .addCase(updateAvatar.rejected, handleUserFailure);
  },
});

export const { setCurrentUserProfile } = usersSlice.actions;
export default usersSlice.reducer;

export const currentUserProfileSelector = state =>
  state.users.currentUserProfile;
