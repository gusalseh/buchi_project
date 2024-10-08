import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Geolocation을 통한 현재 위치 가져오기
export const getCurrentLocation = createAsyncThunk('userLocation/getCurrentLocation', async (_, thunkAPI) => {
  const getPosition = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  try {
    const position = await getPosition();
    const { latitude, longitude } = position.coords;
    return { latitude, longitude };
  } catch (error) {
    console.error('Error fetching current location:', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Location 생성
export const createLocation = createAsyncThunk('userLocation/createLocation', async (locationData, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:80/api/userLocation', locationData);
    return response.data;
  } catch (error) {
    console.error('Error creating location:', error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// 선택한 Location 업데이트
export const updateSelectedLocation = createAsyncThunk(
  'userLocation/updateSelectedLocation',
  async ({ locationId, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:80/api/userLocation/updateSelectedUserLocation/${locationId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error('Error updating location:', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Location 삭제
export const deleteLocation = createAsyncThunk('userLocation/deleteLocation', async (locationId, thunkAPI) => {
  try {
    const response = await axios.delete(`http://localhost:80/api/userLocation/deleteUserLocation/${locationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting location:', error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// 특정 User의 모든 Location 조회
export const fetchUserLocations = createAsyncThunk('userLocation/fetchUserLocations', async (userId, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:80/api/userLocation/fetchUserLocation/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user locations:', error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// 선택된 Location 조회
export const fetchSelectedLocation = createAsyncThunk(
  'userLocation/fetchSelectedLocation',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:80/api/userLocation/selectedLocation/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching selected location:', error);
      return { location_road_address: '역삼역 2번 출구', location_lat: '37.5000263', location_lng: '127.0365456' };
    }
  }
);

// Location 유형별 업데이트
export const updateLocationByType = createAsyncThunk(
  'userLocation/updateLocationByType',
  async (locationData, thunkAPI) => {
    try {
      const response = await axios.put('http://localhost:80/api/userLocation/updateLocationByType', locationData);
      return response.data;
    } catch (error) {
      console.error('Error updating location by type:', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
