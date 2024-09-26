import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, logoutUser } from './userThunk';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      //fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default userSlice.reducer;
