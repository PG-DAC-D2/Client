import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization header interceptor
apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Process a payment
 * @param {Object} paymentData - Payment data object
 * @returns {Promise<Object>} Payment response
 */
export const processPayment = async (paymentData) => {
  try {
    const response = await apiService.post('/api/payments/process', paymentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get user notifications
 * @param {string} email - User email
 * @returns {Promise<Array>} Array of notifications
 */
export const getUserNotifications = async (email) => {
  try {
    const response = await apiService.get(`/api/notifications/recipient/${email}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Create a new product
 * @param {Object} productData - Product data object
 * @returns {Promise<Object>} Created product response
 */
export const createProduct = async (productData) => {
  try {
    const response = await apiService.post('/api/products', productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get all products
 * @returns {Promise<Array>} Array of products
 */
export const getProducts = async () => {
  try {
    const response = await apiService.get('/api/products');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get product by ID
 * @param {string} productId - Product ID
 * @returns {Promise<Object>} Product object
 */
export const getProductById = async (productId) => {
  try {
    const response = await apiService.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Update product
 * @param {string} productId - Product ID
 * @param {Object} productData - Updated product data
 * @returns {Promise<Object>} Updated product response
 */
export const updateProduct = async (productId, productData) => {
  try {
    const response = await apiService.put(`/api/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Delete product
 * @param {string} productId - Product ID
 * @returns {Promise<Object>} Delete response
 */
export const deleteProduct = async (productId) => {
  try {
    const response = await apiService.delete(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get all orders (for dashboard statistics)
 * @returns {Promise<Array>} Array of orders
 */
export const getOrders = async () => {
  try {
    const response = await apiService.get('/api/orders');
    return response.data;
  } catch (error) {
    // Return empty array if endpoint doesn't exist
    console.warn("Orders endpoint not available:", error.message);
    return [];
  }
};

/**
 * Get sales data for the last 7 days
 * Aggregates order data by date
 * @returns {Promise<Array>} Array of daily sales data for last 7 days
 */
export const getSalesDataLast7Days = async () => {
  try {
    // Fetch all orders
    const orders = await getOrders();
    
    // Initialize array for last 7 days with 0 sales
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push({
        date: date.toISOString().split('T')[0],
        sales: 0
      });
    }

    // Aggregate orders by date
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt || order.date);
      const dateStr = orderDate.toISOString().split('T')[0];
      
      const dayData = last7Days.find(d => d.date === dateStr);
      if (dayData) {
        // Sum the order total or quantity
        dayData.sales += order.totalAmount ? Math.round(order.totalAmount / 1000) : 1;
      }
    });

    return last7Days.map(d => d.sales);
  } catch (error) {
    console.warn("Error calculating sales data:", error.message);
    // Return empty array to fallback to dummy data
    return [];
  }
};

export default apiService;
