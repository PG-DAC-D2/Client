import axios from "axios";

// Create axios instance for API Gateway
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (sets auth headers dynamically)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    // ✅ Set Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Set user ID header dynamically (SAFE - per request)
    if (user?.id) {
      config.headers["X-User-Id"] = user.id;
    } else {
      delete config.headers["X-User-Id"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handles session expiry)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 Unauthorized, session has expired
    if (error.response?.status === 401) {
      console.warn("Session expired. Redirecting to login.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;