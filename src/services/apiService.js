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
    const response = await apiService.get(`/api/notifications/email/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error.response?.data || error.message;
  }
};

/**
 * Send notification (SMS or EMAIL)
 * @param {Object} notificationData - Notification data
 * @returns {Promise<Object>} Notification response
 */
export const sendNotification = async (notificationData) => {
  try {
    const response = await apiService.post('/api/notifications/send', notificationData);
    return response.data;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error.response?.data || error.message;
  }
};

/**
 * Send SMS notification via Twilio
 * @param {string} phoneNumber - Phone number to send to
 * @param {string} message - Message content
 * @returns {Promise<Object>} SMS response
 */
export const sendSmsNotification = async (phoneNumber, message) => {
  try {
    const response = await sendNotification({
      notificationType: 'SMS',
      phoneNumber: phoneNumber,
      message: message,
      recipientEmail: null,
      subject: null,
      orderId: null
    });
    return response;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

/**
 * Send email notification
 * @param {string} email - Email address
 * @param {string} subject - Email subject
 * @param {string} message - Email content
 * @returns {Promise<Object>} Email response
 */
export const sendEmailNotification = async (email, subject, message) => {
  try {
    const response = await sendNotification({
      notificationType: 'EMAIL',
      recipientEmail: email,
      subject: subject,
      message: message,
      phoneNumber: null,
      orderId: null
    });
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

/**
 * Create a notification record
 * @param {Object} notificationData - Notification data
 * @returns {Promise<Object>} Notification response
 */
export const createNotification = async (notificationData) => {
  try {
    const response = await sendNotification(notificationData);
    return response;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

export default apiService;
