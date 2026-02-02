import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api/axios";

// Fetch cart
export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const res = await api.get("/api/cart");
  return res.data;
});

// Add item to cart
export const addItemToCart = createAsyncThunk("cart/addItem", async (item) => {
  const res = await api.post("/api/cart/items", item);
  return res.data;
});

// Update item quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateItem",
  async ({ cartItemId, quantity }) => {
    const res = await api.put(`/api/cart/items/${cartItemId}`, { quantity });
    return res.data;
  },
);

// Remove item from cart
export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async (cartItemId) => {
    await api.delete(`/api/cart/items/${cartItemId}`);
    return cartItemId;
  },
);

// Clear cart
export const clearCartAPI = createAsyncThunk("cart/clear", async () => {
  await api.delete("/api/cart/clear");
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Local actions if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        // Assuming the API returns updated cart
        state.items = action.payload.items || state.items;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        // Update local state
        const item = state.items.find(
          (i) => i.cartItemId === action.meta.arg.cartItemId,
        );
        if (item) item.quantity = action.meta.arg.quantity;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (i) => i.cartItemId !== action.payload,
        );
      })
      .addCase(clearCartAPI.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
