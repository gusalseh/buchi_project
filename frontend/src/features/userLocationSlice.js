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
    locations: [],
    selectedLocation: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      //getCurrenLocation
      .addCase(getCurrentLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentLocation.fulfilled, (state, action) => {
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

      //createLocation
      .addCase(createLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.locations.push(action.payload);
      })
      .addCase(createLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //updateSelectedLocation
      .addCase(updateSelectedLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSelectedLocation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.locations.findIndex((loc) => loc.id === action.payload.id);
        if (index !== -1) {
          state.locations[index] = action.payload;
        }
      })
      .addCase(updateSelectedLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = state.locations.filter((loc) => loc.id !== action.meta.arg);
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
        state.locations = action.payload;
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
        state.selectedLocation = action.payload;
      })
      .addCase(fetchSelectedLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdateLocationByType
      .addCase(updateLocationByType.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLocationByType.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.locations.findIndex((loc) => loc.id === action.payload.id);
        if (index !== -1) {
          state.locations[index] = action.payload;
        }
      })
      .addCase(updateLocationByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userLocationSlice.reducer;
