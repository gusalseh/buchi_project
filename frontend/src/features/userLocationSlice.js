import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentLocation,
  createLocation,
  updateSelectedLocation,
  deleteLocation,
  fetchUserLocations,
  fetchSelectedLocation,
  updateLocationByType,
} from './userLocationThunk';

const userLocationSlice = createSlice({
  name: 'userLocation',
  initialState: {
    locations: [], // 유저의 위치 목록
    selectedLocation: null, // 선택된 위치
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getCurrentLocation의 상태 관리
      .addCase(getCurrentLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentLocation.fulfilled, (state, action) => {
        // selectedLocation이 null인 경우 객체로 초기화하고 위치 정보를 저장
        state.selectedLocation = {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        };
        state.loading = false;
      })
      .addCase(getCurrentLocation.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Create Location
      .addCase(createLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.locations.push(action.payload); // 새로운 위치 추가
      })
      .addCase(createLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Selected Location
      .addCase(updateSelectedLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSelectedLocation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.locations.findIndex((loc) => loc.id === action.payload.id);
        if (index !== -1) {
          state.locations[index] = action.payload; // 위치 업데이트
        }
      })
      .addCase(updateSelectedLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Location
      .addCase(deleteLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = state.locations.filter((loc) => loc.id !== action.meta.arg); // 삭제된 위치 제거
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User Locations
      .addCase(fetchUserLocations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload; // 위치 목록 저장
      })
      .addCase(fetchUserLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Selected Location
      .addCase(fetchSelectedLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSelectedLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedLocation = action.payload; // 선택된 위치 저장
      })
      .addCase(fetchSelectedLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Location By Type
      .addCase(updateLocationByType.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLocationByType.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.locations.findIndex((loc) => loc.id === action.payload.id);
        if (index !== -1) {
          state.locations[index] = action.payload; // 유형별 위치 업데이트
        }
      })
      .addCase(updateLocationByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userLocationSlice.reducer;
