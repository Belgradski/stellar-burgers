import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';

import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { clearTokens, storeTokens } from '../../../utils/auth';

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginError?: SerializedError;
  registerError?: SerializedError;
  logoutError?: SerializedError;
  updateError?: SerializedError;
  data: TUser;
  isLoading: boolean;
  isUpdating: boolean;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: {
    email: '',
    name: ''
  },
  isLoading: false,
  isUpdating: false
};

export const register = createAsyncThunk<TUser, TRegisterData>(
  'user/register',
  async (data, { rejectWithValue }) => {
    const response = await registerUserApi(data);
    if (!response?.success) {
      return rejectWithValue(response);
    }
    const { user, refreshToken, accessToken } = response;
    storeTokens(refreshToken, accessToken);
    return user;
  }
);

export const login = createAsyncThunk<TUser, TLoginData>(
  'user/login',
  async (data, { rejectWithValue }) => {
    const response = await loginUserApi(data);
    if (!response?.success) {
      return rejectWithValue(response);
    }
    const { user, refreshToken, accessToken } = response;
    storeTokens(refreshToken, accessToken);
    return user;
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    const response = await logoutApi();
    if (!response?.success) {
      return rejectWithValue(response);
    }
    clearTokens();
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (_, { rejectWithValue }) => {
    const response = await getUserApi();
    if (!response?.success) {
      return rejectWithValue(response);
    }
    return response.user;
  }
);

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/update',
  async (data, { rejectWithValue }) => {
    const response = await updateUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.user;
  }
);

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.registerError = undefined;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.data = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        if (action.meta.rejectedWithValue) {
          state.registerError = action.payload as SerializedError;
        } else {
          state.registerError = action.error;
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.loginError = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loginError = undefined;
        state.isAuthenticated = true;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        if (action.meta.rejectedWithValue) {
          state.loginError = action.payload as SerializedError;
        } else {
          state.loginError = action.error;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.data = {
          email: '',
          name: ''
        };
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        if (action.meta.rejectedWithValue) {
          state.logoutError = action.payload as SerializedError;
        } else {
          state.logoutError = action.error;
        }
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUpdating = false;
        if (action.meta.rejectedWithValue) {
          state.updateError = action.payload as SerializedError;
        } else {
          state.updateError = action.error;
        }
      });
  }
});

export default slice.reducer;
