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

export default apiService;
