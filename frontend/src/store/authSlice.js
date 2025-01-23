import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null, // Track errors for better UX
};

// Thunks
export const registerUser = createAsyncThunk(
  '/auth/register',
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', FormData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Registration failed' });
    }
  }
);

export const loginUser = createAsyncThunk(
  '/auth/login',
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', FormData, {
        withCredentials: true,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Login failed' });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/logout", {}, {
        withCredentials: true,
      });
      localStorage.removeItem('authToken'); // Remove token
      delete axios.defaults.headers.common['Authorization'];
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Logout failed' });
    }
  }
);

export const checkAuth = createAsyncThunk(
  '/auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/auth/check-auth', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Authentication check failed' });
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Registration failed';
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Login failed';
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Authentication check failed';
      })
      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Logout failed';
      });
  },
});

// Export actions and reducer
export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
