// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = false

const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    setAuthModal: (state, action) => {
      state = action.payload;
      return state
    },
  },
});

export const { setAuthModal } = authModalSlice.actions;
export default authModalSlice.reducer;
