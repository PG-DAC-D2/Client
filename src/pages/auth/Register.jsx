import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "../../shared/api/axios";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    dob: "",
    role: "ROLE_CUSTOMER",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      let endpoint = "";
      if (form.role === "ROLE_CUSTOMER") {
        endpoint = "/api/customers/register";
      } else if (form.role === "ROLE_MERCHANT") {
        endpoint = "/api/merchants/register";
      } else if (form.role === "ROLE_ADMIN") {
        endpoint = "/api/admins/register";
      }

      const { confirmPassword, ...dataToSend } = form;
      dataToSend.status = "ACTIVE";

      await axios.post(endpoint, dataToSend);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join us and start shopping</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              placeholder="Enter last name"
              required
            />
          </div>

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
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="auth-input-group">
            <label>Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="ROLE_CUSTOMER">Customer</option>
              <option value="ROLE_MERCHANT">Merchant</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </div> */}

          <div className="auth-input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
