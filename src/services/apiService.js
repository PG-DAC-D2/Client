import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - set JWT token dynamically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ================= PAYMENT SERVICE ================= */

export const paymentAPI = {
  // Create Razorpay order (converts object params to query params)
  createRazorpayOrder: (params) =>
    api.post("/api/payments/razorpay/create-order", null, { 
      params: {
        orderId: params.orderId,
        amount: params.amount,
        currency: params.currency,
        email: params.userEmail,
        phoneNumber: params.phoneNumber
      }
    }),

  // Verify Razorpay payment signature
  verifyRazorpayPayment: (params) =>
    api.post("/api/payments/razorpay/verify", null, { 
      params: {
        orderId: params.orderId,
        paymentId: params.paymentId,
        signature: params.signature
      }
    }),

  // Process payment (triggers Kafka event)
  processPayment: (data) =>
    api.post("/api/payments/process", data),

  // Get payment by order ID
  getPaymentByOrderId: (orderId) =>
    api.get(`/api/payments/order/${orderId}`)
};

/* ================= NOTIFICATION SERVICE ================= */

export const notificationAPI = {
  // Get notifications by order ID
  getByOrderId: (orderId) =>
    api.get(`/api/notifications/order/${orderId}`),

  // Get notifications by email
  getByEmail: (email) =>
    api.get(`/api/notifications/email/${email}`)
};

export default api;
