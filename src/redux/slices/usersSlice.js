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

export const followUser = createAsyncThunk(
  'users/follow',
  async (id, { rejectWithValue }) => {
    try {
      return await userService.followUser(id);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Follow user failed'));
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'users/unfollow',
  async (id, { rejectWithValue }) => {
    try {
      await userService.unfollowUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Unfollow user failed'));
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
    decrementRecipesCount: (state) => {
      if (state.currentUserProfile) {
        state.currentUserProfile.recipesCount -= 1;
      }
    },
    decrementFavoritesCount: (state) => {
      if (state.currentUserProfile) {
        state.currentUserProfile.favoritesCount -= 1;
      }
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
        state.currentUserProfile.avatar = payload.avatar;
      })
      .addCase(updateAvatar.rejected, handleUserFailure)
      .addCase(followUser.fulfilled, (state) => {
        if (state.currentUserProfile) {
          state.currentUserProfile.isFollowing = true;
          state.currentUserProfile.followersCount += 1;
        }
      })
      .addCase(unfollowUser.fulfilled, (state) => {
        if (state.currentUserProfile) {
          state.currentUserProfile.isFollowing = false;
          state.currentUserProfile.followersCount -= 1;
        }
      });
  },
});

export const { setCurrentUserProfile, decrementRecipesCount, decrementFavoritesCount } = usersSlice.actions;
export default usersSlice.reducer;

export const currentUserProfileSelector = state =>
  state.users.currentUserProfile;
