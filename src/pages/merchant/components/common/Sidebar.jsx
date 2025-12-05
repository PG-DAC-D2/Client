import React from "react";
import { NavLink } from "react-router-dom";
import "../../Merchant.css";

export default function Sidebar() {
  return (
    <aside className="merchant-sidebar-container">

      {/* Brand / Title */}
      <div className="merchant-sidebar-brand">
        <h4 style={{ fontWeight: 700, marginBottom: "18px" }}>Merchant Panel</h4>
      </div>

      {/* Navigation */}
      <nav className="merchant-sidebar-nav">

        <NavLink
          to="/merchant/dashboard"
          className={({ isActive }) =>
            isActive ? "merchant-nav-item active" : "merchant-nav-item"
          }
        >
          <span>📊 Dashboard</span>
        </NavLink>

        <NavLink
          to="/merchant/products"
          className={({ isActive }) =>
            isActive ? "merchant-nav-item active" : "merchant-nav-item"
          }
        >
          <span>📦 Products</span>
        </NavLink>

        <NavLink
          to="/merchant/orders"
          className={({ isActive }) =>
            isActive ? "merchant-nav-item active" : "merchant-nav-item"
          }
        >
          <span>🧾 Orders</span>
        </NavLink>

        <NavLink
          to="/merchant/analytics"
          className={({ isActive }) =>
            isActive ? "merchant-nav-item active" : "merchant-nav-item"
          }
        >
          <span>📈 Analytics</span>
        </NavLink>

        <NavLink
          to="/merchant/payouts"
          className={({ isActive }) =>
            isActive ? "merchant-nav-item active" : "merchant-nav-item"
          }
        >
          <span>💰 Payouts</span>
        </NavLink>

        <NavLink
          to="/merchant/settings"
          className={({ isActive }) =>
            isActive ? "merchant-nav-item active" : "merchant-nav-item"
          }
        >
          <span>⚙️ Settings</span>
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="merchant-sidebar-footer">
        <button
          onClick={() => (window.location.href = "/")}
          className="btn-ghost"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            fontSize: "15px",
            cursor: "pointer",
            color: "#d9534f",
            marginTop: "20px",
          }}
        >
          🚪 Logout
        </button>
      </div>

    </aside>
  );
}
