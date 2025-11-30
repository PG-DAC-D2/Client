import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
// import cartReducer from '../features/cart/cartSlice';
// import wishlistReducer from '../features/wishlist/wishlistSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    // cart: cartReducer,
    // wishlist: wishlistReducer,
  },
});
