import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api/axios";

// Fetch product details by ID
const fetchProductDetails = async (productId) => {
  try {
    const res = await api.get(`/api/products/${productId}`);
    return res.data;
  } catch (error) {
    console.warn(`Could not fetch product ${productId}:`, error.message);
    return null;
  }
};

// Helper function to map server-side model to frontend state model
const mapCartItems = async (serverItems) => {
  const items = (serverItems || []);
  
  // Fetch product details for each cart item
  const enrichedItems = await Promise.all(
    items.map(async (i) => {
      let productDetails = null;
      const productId = i.productId || i.ProductId || i.ProductID;
      
      if (productId) {
        productDetails = await fetchProductDetails(productId);
      }
      
      return {
        // Support various naming conventions from different microservices (.NET vs Java)
        id: i.productId || i.ProductId || i.ProductID || i.cartItemId || i.CartItemId,
        cartItemId: i.cartItemId || i.CartItemId || i.CartItemID || null,
        name: i.productName || i.ProductName || i.Product || "",
        price: i.unitPrice || i.UnitPrice || i.price || 0,
        quantity: i.quantity || i.Quantity || 1,
        // Enrich with product details (image, size, category/color)
        image: productDetails?.imageUrl?.[0] || i.imageUrl?.[0] || i.image || null,
        size: productDetails?.sizes?.[0] || i.size || null,
        color: productDetails?.tags?.[0] || i.color || null,
        category: productDetails?.tags?.[0] || i.category || null,
      };
    })
  );
  
  return enrichedItems;
};

// Fetch cart
export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const res = await api.get("/api/cart");
  const cart = res.data || {};
  const items = cart.items || cart.Items || [];
  const enrichedItems = await mapCartItems(items);
  return { ...cart, items: enrichedItems };
});

// Add item to cart - Now expects full cart object back
export const addItemToCart = createAsyncThunk("cart/addItem", async (item, { rejectWithValue }) => {
  try {
    console.log("🛒 Adding item to cart:", item);
    const res = await api.post("/api/cart/items", item);
    console.log("✅ Cart updated successfully:", res.data);
    const cart = res.data || {};
    const items = cart.items || cart.Items || [];
    const enrichedItems = await mapCartItems(items);
    return { ...cart, items: enrichedItems };
  } catch (error) {
    console.error("❌ Error adding item to cart:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Update item quantity - Now expects full cart object back
export const updateCartItem = createAsyncThunk(
  "cart/updateItem",
  async ({ cartItemId, quantity }) => {
    const res = await api.put(`/api/cart/items/${cartItemId}`, { quantity });
    const cart = res.data || {};
    const items = cart.items || cart.Items || [];
    const enrichedItems = await mapCartItems(items);
    return { ...cart, items: enrichedItems };
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching the full cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        const cart = action.payload || {};
        state.items = cart.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Handle adding an item (Updates full list from server response)
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        const cart = action.payload || {};
        state.items = cart.items || [];
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add item to cart";
      })

      // Handle updating quantity (Syncs with server-provided list)
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const cart = action.payload || {};
        state.items = cart.items || [];
      })

      // Handle item removal
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (i) => i.cartItemId !== action.payload,
        );
      })

      // Handle clearing cart
      .addCase(clearCartAPI.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;