import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../shared/api/axios';

// Static wishlist data (for development without backend)
const staticWishlists = [
  {
    _id: '1',
    name: 'Footwear',
    description: 'All sneakers, training, running shoes',
    createdBy: 'current-user-id',
    createdByUsername: 'Current User',
    members: ['current-user-id'],
    memberUsernames: ['Current User'],
    products: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    name: 'OutFit of Day',
    description: 'Dream wardrobe',
    createdBy: 'current-user-id',
    createdByUsername: 'Current User',
    members: ['current-user-id'],
    memberUsernames: ['Current User'],
    products: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Fetch all wishlists for the current user
export const fetchWishlists = createAsyncThunk('wishlists/fetch', async () => {
  // For now, return static data. Uncomment below when backend is ready:
  // const res = await api.get('/wishlists');
  // return res.data;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return staticWishlists;
});

// Fetch single wishlist by ID
export const fetchWishlistById = createAsyncThunk('wishlists/fetchById', async (id) => {
  // For now, return static data. Uncomment below when backend is ready:
  // const res = await api.get(`/wishlists/${id}`);
  // return res.data;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const wishlist = staticWishlists.find(w => w._id === id);
  if (!wishlist) {
    throw new Error('Wishlist not found');
  }
  return wishlist;
});

// Create new wishlist
export const createWishlist = createAsyncThunk('wishlists/create', async (wishlistData) => {
  // For now, create static data. Uncomment below when backend is ready:
  // const res = await api.post('/wishlists', wishlistData);
  // return res.data;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const newWishlist = {
    _id: Date.now().toString(),
    ...wishlistData,
    createdBy: 'current-user-id',
    createdByUsername: 'Current User',
    members: ['current-user-id'],
    memberUsernames: ['Current User'],
    products: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return newWishlist;
});

// Update wishlist
export const updateWishlist = createAsyncThunk('wishlists/update', async ({ id, data }) => {
  // For now, update static data. Uncomment below when backend is ready:
  // const res = await api.put(`/wishlists/${id}`, data);
  // return res.data;
  
  await new Promise(resolve => setTimeout(resolve, 300));
  // In real implementation, this would update the wishlist
  return { _id: id, ...data, updatedAt: new Date().toISOString() };
});

// Delete wishlist
export const deleteWishlist = createAsyncThunk('wishlists/delete', async (id) => {
  // For now, just return id. Uncomment below when backend is ready:
  // await api.delete(`/wishlists/${id}`);
  // return id;
  
  await new Promise(resolve => setTimeout(resolve, 300));
  return id;
});

// Add product to wishlist
export const addProductToWishlist = createAsyncThunk('wishlists/addProduct', async ({ wishlistId, productData }) => {
  // For now, return updated wishlist. Uncomment below when backend is ready:
  // const res = await api.post(`/wishlists/${wishlistId}/products`, productData);
  // return res.data;
  
  await new Promise(resolve => setTimeout(resolve, 300));
  // In real implementation, this would add the product
  return { _id: wishlistId, products: [] };
});

// Remove product from wishlist
export const removeProductFromWishlist = createAsyncThunk('wishlists/removeProduct', async ({ wishlistId, productId }) => {
  // For now, just return ids. Uncomment below when backend is ready:
  // await api.delete(`/wishlists/${wishlistId}/products/${productId}`);
  // return { wishlistId, productId };
  
  await new Promise(resolve => setTimeout(resolve, 300));
  return { wishlistId, productId };
});

// Invite collaborator to wishlist
export const inviteCollaborator = createAsyncThunk('wishlists/invite', async ({ wishlistId, email }) => {
  // For now, return wishlist id and email. Uncomment below when backend is ready:
  // const res = await api.post(`/wishlists/${wishlistId}/invite`, { email });
  // return res.data;
  
  await new Promise(resolve => setTimeout(resolve, 300));
  // Return id and email - reducer will handle adding to members array
  return { _id: wishlistId, email };
});

// Remove collaborator from wishlist
export const removeCollaborator = createAsyncThunk('wishlists/removeCollaborator', async ({ wishlistId, userId }) => {
  // For now, just return ids. Uncomment below when backend is ready:
  // const res = await api.delete(`/wishlists/${wishlistId}/collaborators/${userId}`);
  // return { wishlistId, userId };
  
  await new Promise(resolve => setTimeout(resolve, 300));
  return { wishlistId, userId };
});

const wishlistSlice = createSlice({
  name: 'wishlists',
  initialState: {
    items: [],
    currentWishlist: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentWishlist: (state) => {
      state.currentWishlist = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all wishlists
      .addCase(fetchWishlists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlists.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch single wishlist
      .addCase(fetchWishlistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWishlist = action.payload;
      })
      .addCase(fetchWishlistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create wishlist
      .addCase(createWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update wishlist
      .addCase(updateWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(w => w._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentWishlist?._id === action.payload._id) {
          state.currentWishlist = action.payload;
        }
      })
      .addCase(updateWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete wishlist
      .addCase(deleteWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(w => w._id !== action.payload);
        if (state.currentWishlist?._id === action.payload) {
          state.currentWishlist = null;
        }
      })
      .addCase(deleteWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add product
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        const wishlist = state.items.find(w => w._id === action.payload._id);
        if (wishlist) {
          wishlist.products = action.payload.products;
        }
        if (state.currentWishlist?._id === action.payload._id) {
          state.currentWishlist = action.payload;
        }
      })

      // Remove product
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        const wishlist = state.items.find(w => w._id === action.payload.wishlistId);
        if (wishlist) {
          wishlist.products = wishlist.products.filter(p => p._id !== action.payload.productId);
        }
        if (state.currentWishlist?._id === action.payload.wishlistId) {
          state.currentWishlist.products = state.currentWishlist.products.filter(
            p => p._id !== action.payload.productId
          );
        }
      })

      // Invite collaborator
      .addCase(inviteCollaborator.fulfilled, (state, action) => {
        const wishlist = state.items.find(w => w._id === action.payload._id);
        if (wishlist) {
          // If payload has members/memberUsernames, use them; otherwise simulate adding
          if (action.payload.members && action.payload.memberUsernames) {
            wishlist.members = action.payload.members;
            wishlist.memberUsernames = action.payload.memberUsernames;
          } else {
            // For static data: simulate adding a collaborator
            const newMemberId = `user-${Date.now()}`;
            const newMemberUsername = action.payload.email?.split('@')[0] || 'New User';
            if (!wishlist.members.includes(newMemberId)) {
              wishlist.members.push(newMemberId);
              wishlist.memberUsernames.push(newMemberUsername);
            }
          }
        }
        if (state.currentWishlist?._id === action.payload._id) {
          if (action.payload.members && action.payload.memberUsernames) {
            state.currentWishlist.members = action.payload.members;
            state.currentWishlist.memberUsernames = action.payload.memberUsernames;
          } else {
            const newMemberId = `user-${Date.now()}`;
            const newMemberUsername = action.payload.email?.split('@')[0] || 'New User';
            if (!state.currentWishlist.members.includes(newMemberId)) {
              state.currentWishlist.members.push(newMemberId);
              state.currentWishlist.memberUsernames.push(newMemberUsername);
            }
          }
        }
      })

      // Remove collaborator
      .addCase(removeCollaborator.fulfilled, (state, action) => {
        const wishlist = state.items.find(w => w._id === action.payload.wishlistId);
        if (wishlist) {
          wishlist.members = wishlist.members.filter(m => m !== action.payload.userId);
          wishlist.memberUsernames = wishlist.memberUsernames.filter(
            (_, idx) => wishlist.members[idx] !== action.payload.userId
          );
        }
        if (state.currentWishlist?._id === action.payload.wishlistId) {
          state.currentWishlist.members = state.currentWishlist.members.filter(
            m => m !== action.payload.userId
          );
        }
      });
  },
});

export const { clearCurrentWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

