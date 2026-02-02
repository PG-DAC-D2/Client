import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api/axios";

// Fetch all products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await api.get("/api/products");
  return res.data;
});

// Fetch single product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    const res = await api.get(`/api/products/${id}`);
    return res.data;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch single product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
