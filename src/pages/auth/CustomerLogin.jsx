import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../auth/login.css";
import axios from "../../shared/api/axios";
import { useDispatch } from "react-redux";
import { login } from "../../app/slices/authSlice";

function CustomerLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "",userRole: "ROLE_CUSTOMER" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/signin", form);
      console.log("Login successful:", response.data);
      dispatch(
        login({
          user: response.data.id,
          token: response.data.token,
          role: "ROLE_CUSTOMER",
        }),
      );
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Login as Customer</p>

        <form onSubmit={handleSubmit}>
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
            Don't have an account?{" "}
            <Link to="/register/customer">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CustomerLogin;
