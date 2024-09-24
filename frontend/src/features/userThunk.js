/* 비동기 로직 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await axios.get(`https://d6utypy1uf0r7.cloudfront.net/auth/api/user`, {
    withCredentials: true,
  });
  return response.data;
});

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await axios.get(`https://d6utypy1uf0r7.cloudfront.net/auth/logout`, { withCredentials: true });
  window.location.href = `https://d6utypy1uf0r7.cloudfront.net`; // 로그아웃 후 리다이렉트
});

export const updateUserCompany = createAsyncThunk(
  'user/updateUserCompany',
  async ({ companyId }, { getState, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://d6utypy1uf0r7.cloudfront.net/auth/update-company`,
        { companyId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
