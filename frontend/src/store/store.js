import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import imageReducer from '../features/imageSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    images: imageReducer,
  },
});

export default store;
