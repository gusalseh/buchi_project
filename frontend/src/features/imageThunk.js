import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Spot 이미지 불러오기
export const fetchSpotImages = createAsyncThunk('images/fetchSpotImages', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:80/image/spot/1/images`);
    return response.data.imageUrls;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return rejectWithValue('No spot images found.');
    }
    return rejectWithValue('Failed to fetch spot images.');
  }
});

// Menu 이미지 불러오기
export const fetchMenuImages = createAsyncThunk('images/fetchMenuImages', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:80/image/menu/1/images`);
    return response.data.imageUrls;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return rejectWithValue('No menu images found.');
    }
    return rejectWithValue('Failed to fetch menu images.');
  }
});
