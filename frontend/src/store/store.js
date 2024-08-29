import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import imageReducer from '../features/imageSlice';
import companyReducer from '../features/companySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    images: imageReducer,
    company: companyReducer,
  },
});

export default store;
