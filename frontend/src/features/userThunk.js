/* 비동기 로직 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await axios.get('http://localhost:3000/auth/api/user', { withCredentials: true });
  return response.data;
});

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await axios.get('http://localhost:3000/auth/logout', { withCredentials: true });
  window.location.href = 'http://localhost:3001'; // 로그아웃 후 리다이렉트
});
