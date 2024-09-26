import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await axios.get(`http://localhost:80/api/auth/api/user`, {
    withCredentials: true,
  });
  return response.data;
});

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await axios.get(`http://localhost:80/api/auth/logout`, { withCredentials: true });
  window.location.href = `http://localhost:3000`;
});

export const updateUserCompany = createAsyncThunk(
  'user/updateUserCompany',
  async ({ companyId }, { getState, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:80/api/auth/update-company`,
        { companyId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
