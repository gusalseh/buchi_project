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
  reducers: {
    // 동기 작업이 필요하면 여기에 추가 가능
  },
  extraReducers: (builder) => {
    // Spot 이미지 요청에 대한 리듀서
    builder
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
      });

    // Menu 이미지 요청에 대한 리듀서
    builder
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
