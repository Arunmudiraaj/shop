// src/features/authSlice.js
import { createAction, createSlice } from "@reduxjs/toolkit";
export const revertAllCart = createAction('REVERT_ALL');

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartData: (state, action) => {
      state = action.payload || [];
      return state;
    },
    updateQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;
      const existingItemIndex = state.findIndex((item) => item.id === cartItemId);
      if (existingItemIndex !== -1) {
        if(quantity === 0) {
          state.splice(existingItemIndex, 1);
        } else {
          state[existingItemIndex].quantity = quantity;
        }
      }
    },
    addItem: (state, action) => {
      const productId  = action.payload?.product?.id;
      const existingItemIndex = state.findIndex((item) => item?.product?.id === productId);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += 1;
      } else {
        state.push(action.payload);
      }
    }
  },
});

export const { updateQuantity, setCartData, addItem } = cartSlice.actions;
export default cartSlice.reducer;
