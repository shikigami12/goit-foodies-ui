import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Extracts error message from error object
 * @param {Error} error - Error object
 * @param {string} fallbackMessage - Fallback message if error message not found
 * @returns {string} Error message
 */
const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message || error?.message || fallbackMessage;

/**
 * Helper to handle auth success state
 */
const handleAuthSuccess = (state, action) => {
  state.isLoading = false;
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isAuthenticated = true;
  state.error = null;
};

/**
 * Helper to handle auth failure state
 */
const handleAuthFailure = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

/**
 * Helper to clear auth state
 */
const clearAuthState = (state) => {
  state.user = null;
  state.token = null;
  state.isAuthenticated = false;
  state.error = null;
};

// SIGN UP
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Signup failed'));
    }
  }
);

// SIGN IN
export const signin = createAsyncThunk(
  'auth/signin',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Sign in failed'));
    }
  }
);

// LOGOUT
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      // Even if backend logout fails, clear local auth state
      return rejectWithValue(getErrorMessage(error, 'Logout failed'));
    }
  }
);

// FETCH CURRENT USER
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getCurrentUser();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to get user'));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // SIGNUP
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, handleAuthSuccess)
      .addCase(signup.rejected, handleAuthFailure)
      // SIGNIN
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, handleAuthSuccess)
      .addCase(signin.rejected, handleAuthFailure)
      // LOGOUT
      .addCase(logout.fulfilled, clearAuthState)
      .addCase(logout.rejected, clearAuthState)
      // CURRENT USER
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
