import { createSlice } from '@reduxjs/toolkit';
import { fetchSpotImages, fetchMenuImages } from './imageThunk';

const initialState = {
  spotImages: [],
  menuImages: [],
  spotError: null,
  menuError: null,
  loading: false,
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //fetchSpotImages
      .addCase(fetchSpotImages.pending, (state) => {
        state.loading = true;
        state.spotError = null;
      })
      .addCase(fetchSpotImages.fulfilled, (state, action) => {
        state.loading = false;
        state.spotImages = action.payload;
      })
      .addCase(fetchSpotImages.rejected, (state, action) => {
        state.loading = false;
        state.spotError = action.payload;
      })

      //fetchMenuImages
      .addCase(fetchMenuImages.pending, (state) => {
        state.loading = true;
        state.menuError = null;
      })
      .addCase(fetchMenuImages.fulfilled, (state, action) => {
        state.loading = false;
        state.menuImages = action.payload;
      })
      .addCase(fetchMenuImages.rejected, (state, action) => {
        state.loading = false;
        state.menuError = action.payload;
      });
  },
});

export default imageSlice.reducer;
