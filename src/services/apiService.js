import axios from 'axios';

// ============================================
// AXIOS INSTANCE WITH TIMEOUT & INTERCEPTORS
// ============================================

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 15000,  // 15 second timeout to prevent hanging
  headers: {
    'Content-Type': 'application/json'
  }
});

// ============================================
// REQUEST INTERCEPTOR
// ============================================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Log request for debugging
  console.log(`[${new Date().toISOString()}] ${config.method.toUpperCase()} ${config.url}`);

  return config;
}, (error) => {
  console.error('Request Error:', error.message);
  return Promise.reject(error);
});

// ============================================
// RESPONSE INTERCEPTOR
// ============================================
api.interceptors.response.use((response) => {
  console.log(`[${new Date().toISOString()}] ${response.status} ${response.config.url}`);
  return response;
}, (error) => {
  // Handle timeout
  if (error.code === 'ECONNABORTED') {
    error.message = 'Request timeout (15s). Server may be slow or unreachable.';
  }

  // Handle network error
  if (error.message === 'Network Error' && !error.response) {
    error.message = 'Cannot reach backend. Ensure Payment/Notification services are running.';
  }

  // Handle server errors
  if (error.response?.status >= 500) {
    error.message = `Server error (${error.response.status}): ${error.response.data?.message || error.message}`;
  }

  console.error(`[${new Date().toISOString()}] ${error.response?.status || 'Error'} - ${error.message}`);

  return Promise.reject(error);
});

/* ================= PAYMENT SERVICE ================= */

export const paymentAPI = {
  // Create Razorpay order (converts object params to query params)
  createRazorpayOrder: async (params) => {
    try {
      const response = await api.post("/api/payments/razorpay/create-order", null, { 
        params: {
          orderId: params.orderId,
          amount: params.amount,
          currency: params.currency || 'INR',
          email: params.userEmail,
          phoneNumber: params.phoneNumber
        }
      });
      return response;
    } catch (error) {
      console.error('createRazorpayOrder error:', error);
      throw error;
    }
  },

  // Verify Razorpay payment signature
  verifyRazorpayPayment: async (params) => {
    try {
      const response = await api.post("/api/payments/razorpay/verify", null, { 
        params: {
          orderId: params.orderId,
          paymentId: params.paymentId,
          signature: params.signature
        }
      });
      return response;
    } catch (error) {
      console.error('verifyRazorpayPayment error:', error);
      throw error;
    }
  },

  // Process payment (triggers Kafka event)
  // CRITICAL: This sends to backend which publishes to Kafka asynchronously
  processPayment: async (data) => {
    try {
      const response = await api.post("/api/payments/process", {
        orderId: data.orderId,
        amount: data.amount,
        currency: data.currency || 'INR',
        userEmail: data.userEmail,
        userName: data.userName,
        phoneNumber: data.phoneNumber, // Already formatted with +91 if needed
        paymentMethod: data.paymentMethod || 'RAZORPAY',
        razorpayPaymentId: data.razorpayPaymentId,
        razorpayOrderId: data.razorpayOrderId,
        razorpaySignature: data.razorpaySignature
      });

      if (!response.data || !response.data.paymentId) {
        throw new Error('Invalid payment response from server');
      }

      return response;
    } catch (error) {
      console.error('processPayment error:', error);
      throw error;
    }
  },

  // Get payment by order ID
  getPaymentByOrderId: async (orderId) => {
    try {
      const response = await api.get(`/api/payments/order/${orderId}`);
      return response;
    } catch (error) {
      console.error('getPaymentByOrderId error:', error);
      throw error;
    }
  },

  // Health check
  getHealth: async () => {
    try {
      const response = await api.get("/api/payments/health");
      return response;
    } catch (error) {
      console.error('Payment health check error:', error);
      throw error;
    }
  }
};

/* ================= NOTIFICATION SERVICE ================= */

export const notificationAPI = {
  // Get notifications by order ID
  getByOrderId: async (orderId) => {
    try {
      const response = await api.get(`/api/notifications/order/${orderId}`);
      return response;
    } catch (error) {
      console.error('getByOrderId error:', error);
      throw error;
    }
  },

  // Get notifications by email
  getByEmail: async (email) => {
    try {
      const response = await api.get(`/api/notifications/email/${email}`);
      return response;
    } catch (error) {
      console.error('getByEmail error:', error);
      throw error;
    }
  },

  // Get pending notifications
  getPending: async () => {
    try {
      const response = await api.get("/api/notifications/pending");
      return response;
    } catch (error) {
      console.error('getPending error:', error);
      throw error;
    }
  },

  // Get failed notifications
  getFailed: async () => {
    try {
      const response = await api.get("/api/notifications/failed");
      return response;
    } catch (error) {
      console.error('getFailed error:', error);
      throw error;
    }
  },

  // Health check
  getHealth: async () => {
    try {
      const response = await api.get("/api/notifications/health");
      return response;
    } catch (error) {
      console.error('Notification health check error:', error);
      throw error;
    }
  }
};

/* ================= ORDER SERVICE ================= */

export const orderAPI = {
  // Get all orders
  getOrders: async () => {
    try {
      const response = await api.get("/api/orders");
      return response;
    } catch (error) {
      console.error('getOrders error:', error);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    try {
      const response = await api.get(`/api/orders/${orderId}`);
      return response;
    } catch (error) {
      console.error('getOrderById error:', error);
      throw error;
    }
  },

  // Create order
  createOrder: async (data) => {
    try {
      const response = await api.post("/api/orders", data);
      return response;
    } catch (error) {
      console.error('createOrder error:', error);
      throw error;
    }
  },

  // Update order
  updateOrder: async (orderId, data) => {
    try {
      const response = await api.put(`/api/orders/${orderId}`, data);
      return response;
    } catch (error) {
      console.error('updateOrder error:', error);
      throw error;
    }
  },

  // Delete order
  deleteOrder: async (orderId) => {
    try {
      const response = await api.delete(`/api/orders/${orderId}`);
      return response;
    } catch (error) {
      console.error('deleteOrder error:', error);
      throw error;
    }
  }
};

/* ================= PRODUCT SERVICE ================= */

export const productAPI = {
  // Get all products
  getProducts: async () => {
    try {
      const response = await api.get("/api/products");
      return response;
    } catch (error) {
      console.error('getProducts error:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (productId) => {
    try {
      const response = await api.get(`/api/products/${productId}`);
      return response;
    } catch (error) {
      console.error('getProductById error:', error);
      throw error;
    }
  },

  // Create product
  createProduct: async (data) => {
    try {
      const response = await api.post("/api/products", data);
      return response;
    } catch (error) {
      console.error('createProduct error:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (productId, data) => {
    try {
      const response = await api.put(`/api/products/${productId}`, data);
      return response;
    } catch (error) {
      console.error('updateProduct error:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (productId) => {
    try {
      const response = await api.delete(`/api/products/${productId}`);
      return response;
    } catch (error) {
      console.error('deleteProduct error:', error);
      throw error;
    }
  }
};

// ============================================
// NAMED EXPORTS FOR CONVENIENCE
// ============================================

export const getOrders = orderAPI.getOrders;
export const getProducts = productAPI.getProducts;

export default api;
