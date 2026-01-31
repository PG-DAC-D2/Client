import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

function AuthLanding() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome to Online Shopping System</h2>
        <p className="auth-subtitle">Choose your role to continue</p>

        <div className="role-buttons">
          <div className="role-section">
            <h3>Customer</h3>
            <div className="button-group">
              <Link to="/login/customer">
                <button className="auth-btn">Login as Customer</button>
              </Link>
              <Link to="/register/customer">
                <button className="auth-btn secondary">
                  Register as Customer
                </button>
              </Link>
            </div>
          </div>

          <div className="role-section">
            <h3>Merchant</h3>
            <div className="button-group">
              <Link to="/login/merchant">
                <button className="auth-btn">Login as Merchant</button>
              </Link>
              <Link to="/register/merchant">
                <button className="auth-btn secondary">
                  Register as Merchant
                </button>
              </Link>
            </div>
          </div>

          <div className="role-section">
            <h3>Admin</h3>
            <div className="button-group">
              <Link to="/login/admin">
                <button className="auth-btn">Login as Admin</button>
              </Link>
              <Link to="/register/admin">
                <button className="auth-btn secondary">
                  Register as Admin
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLanding;
