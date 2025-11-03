import { getFeedsApi } from '@api';
import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { error } from 'console';

type TFeedState = {
  isLoading: boolean;
  error: null | SerializedError;
  data: TOrdersData;
};

export const initialState: TFeedState = {
  isLoading: true,
  error: null,
  data: {
    orders: [],
    total: NaN,
    totalToday: NaN
  }
};

export const fetchFeeds = createAsyncThunk<TOrdersData>(
  'feeds/fetch',
  async () => {
    const response = await getFeedsApi();
    return response;
  }
);

const slice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export default slice.reducer;
