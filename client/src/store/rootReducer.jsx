// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import authModal from './authModal';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    authModal: authModal
  },
});

export default store;
