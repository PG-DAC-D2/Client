import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "../../shared/api/axios";
import { useDispatch } from "react-redux";
import { login } from "../../app/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
    userRole: "ROLE_CUSTOMER",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let endpoint = "";
      if (form.userRole === "ROLE_CUSTOMER") {
        endpoint = "/customers/login";
      } else if (form.userRole === "ROLE_MERCHANT") {
        endpoint = "/merchants/login";
      } else if (form.userRole === "ROLE_ADMIN") {
        endpoint = "/admins/login";
      }

      const response = await axios.post(endpoint, {
        email: form.email,
        password: form.password,
      });
      console.log("Login successful:", response.data);
      // Assuming response.data has { user, token, role }
      dispatch(
        login({
          user: response.data.user,
          token: response.data.token,
          role: form.userRole,
        }),
      );
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error, e.g., show message
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Login to continue shopping</p>

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
          {/* 
          <div className="auth-input-group">
            <label>User Role</label>
            <div className="role-selection">
              <label>
                <input
                  type="radio"
                  name="userRole"
                  value="ROLE_CUSTOMER"
                  checked={form.userRole === "ROLE_CUSTOMER"}
                  onChange={handleChange}
                  required
                />
                Customer
              </label>
              <label>
                <input
                  type="radio"
                  name="userRole"
                  value="ROLE_MERCHANT"
                  checked={form.userRole === "ROLE_MERCHANT"}
                  onChange={handleChange}
                />
                Merchant
              </label>
              <label>
                <input
                  type="radio"
                  name="userRole"
                  value="ROLE_ADMIN"
                  checked={form.userRole === "ROLE_ADMIN"}
                  onChange={handleChange}
                />
                Admin
              </label>
            </div>
          </div> */}

          <button type="submit" className="auth-btn">
            Login
          </button>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
