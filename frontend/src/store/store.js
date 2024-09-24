import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import imageReducer from '../features/imageSlice';
import companyReducer from '../features/companySlice';
import userLocationReducer from '../features/userLocationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    images: imageReducer,
    company: companyReducer,
    userLocation: userLocationReducer,
  },
});

export default store;
