// src/redux/reduxtoolkit/cartSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cartService } from '../../service/userservice/cartService';

// Add to Cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity, userId }, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart(productId, quantity, userId); // Pass userId to the service
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Get Cart
export const getCart = createAsyncThunk(
  'cart/getCart',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await cartService.getCart(userId); // Pass userId to the service
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload.items;
        state.totalQuantity = action.payload.items.reduce((sum, item) => sum + item.quantity, 0);
        // state.totalPrice = action.payload.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        if (!action.payload || !Array.isArray(action.payload.items)) {
            console.error('Invalid payload received:', action.payload);
            state.status = 'failed';
            state.error = 'No items found in cart';
            return;
        }
    
        // Safely proceed to update the state
        state.cartItems = action.payload.items;
        state.totalQuantity = action.payload.items.reduce((sum, item) => sum + item.quantity, 0);
        state.totalPrice = action.payload.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
    });
    
    
  },
});

export default cartSlice.reducer;
