import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authService, tokenManager } from '../../services';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message || error?.message || fallbackMessage;

const handleAuthSuccess = (state, action) => {
  state.isLoading = false;
  state.user = action.payload.user;
  state.isAuthenticated = true;
  state.error = null;
};

const handleAuthFailure = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const clearAuthState = (state) => {
  state.user = null;
  state.isAuthenticated = false;
  state.error = null;
};

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

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Logout failed'));
    }
  }
);

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
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, handleAuthSuccess)
      .addCase(signup.rejected, handleAuthFailure)
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, handleAuthSuccess)
      .addCase(signin.rejected, handleAuthFailure)
      .addCase(logout.fulfilled, clearAuthState)
      .addCase(logout.rejected, clearAuthState)
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
        tokenManager.removeToken();
      });
  },
});

export const { clearError, updateUser } = authSlice.actions;

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'isAuthenticated'],
};

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

const authReducer = (state = initialState, action) => {
  const result = persistedReducer(state, action);
  
  if (action.type === 'persist/REHYDRATE' && action.payload) {
    const hasToken = tokenManager.hasToken();
    const hasUser = Boolean(result.user);
    
    if (!hasToken) {
      return {
        ...initialState,
        user: null,
        isAuthenticated: false,
      };
    }
    
    return {
      ...result,
      isAuthenticated: hasToken && hasUser,
      isLoading: false,
      error: null,
    };
  }
  
  return result;
};

export default authReducer;
