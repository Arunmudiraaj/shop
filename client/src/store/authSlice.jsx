// src/features/authSlice.js
import { createAction, createSlice } from '@reduxjs/toolkit';
import { getToken, setToken, removeToken } from '../utils/auth';
export const revertAll = createAction('REVERT_ALL');

const initialState = getToken()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      setToken(action.payload); // Save token in localStorage
    },
    loginFailure: (state, action) => {
        state.accessToken = null;
        state.user = null;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      removeToken();
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
