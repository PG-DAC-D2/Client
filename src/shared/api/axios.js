import axios from "axios";

// Helper to decode JWT for debugging
const decodeJWT = (token) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(atob(parts[1]));
  } catch (e) {
    return null;
  }
};

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    "X-User-Id": JSON.parse(localStorage.getItem("user"))?.id || null
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    if (token) {
      // Create a fresh headers object to ensure it is not lost
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      };
      
      // Useful for verifying the token being sent matches your login
      const payload = decodeJWT(token);
      console.log("🔐 Authorization header strictly set for user:", payload?.sub || payload?.user_id);
    } else {
      console.warn("⚠️ No token found in localStorage");
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;