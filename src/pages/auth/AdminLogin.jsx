import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../auth/login.css";
import axios from "../../shared/api/axios";
import { useDispatch } from "react-redux";
import { login } from "../../app/slices/authSlice";

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
    userRole: "ROLE_ADMIN",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signin", form);
      console.log("Login response:", response.data);
      
      const { token, role, id } = response.data;
      
      // Verify the response has the required fields
      if (!token || !id) {
        console.error("Invalid response structure:", response.data);
        alert("Login failed: Invalid server response");
        return;
      }

      dispatch(
        login({
          user: { id, email: form.email },
          token,
          role: role || "ROLE_ADMIN",
        }),
      );

      console.log("Auth state updated, navigating to admin dashboard");
      // Use a small timeout to ensure auth state is updated
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 100);
    } catch (error) {
      console.error("Login failed:", error.response || error.message || error);
      const status = error.response?.status;
      const body = error.response?.data;
      const msg = body?.message || body?.error || error.message || "Login failed";
      setErrorMsg(`(${status || "?"}) ${msg}`);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Login as Admin</p>

        <form onSubmit={handleSubmit}>
          {errorMsg && <p className="error-message">{errorMsg}</p>}
          <div className="auth-input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>

          <p className="auth-footer">
            Don't have an account? <Link to="/register/admin">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
