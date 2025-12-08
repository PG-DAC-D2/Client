import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiBox, FiClipboard, FiBarChart2, FiDollarSign, FiSettings, FiLogOut } from "react-icons/fi";
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
          <div className="nav-icon-label">
            <FiHome size={18} />
            <span>Dashboard</span>
            </div>
        </NavLink>

        <NavLink
          to="/merchant/products"
          className={({ isActive }) =>
            isActive ? "merchant-nav-item active" : "merchant-nav-item"
          }
        >

          <div className="nav-icon-label">
            <FiBox size={18} />
            <span>Products</span>
          </div>
        </NavLink>

        <NavLink
          to="/merchant/orders"
          className={({ isActive }) =>
            isActive ? "merchant-nav-item active" : "merchant-nav-item"
          }
        >

          <div className="nav-icon-label">
            <FiClipboard size={18} />
            <span>Orders</span>
          </div>
        </NavLink>

        <NavLink
          to="/merchant/analytics"
          className={({ isActive }) =>
            isActive ? "merchant-nav-item active" : "merchant-nav-item"
          }
        >
          <div className="nav-icon-label">
            <FiBarChart2 size={18} />
            <span>Analytics</span>
          </div>
        </NavLink>

        <NavLink
          to="/merchant/payouts"
          className={({ isActive }) =>
            isActive ? "merchant-nav-item active" : "merchant-nav-item"
          }
        >

          <div className="nav-icon-label">
            <FiDollarSign size={18} />
            <span>Payouts</span>
          </div>
        </NavLink>

        {/* <NavLink
          to="/merchant/settings"
          className={({ isActive }) =>
            isActive ? "merchant-nav-item active" : "merchant-nav-item"
          }
        >

          <div className="nav-icon-label">
            <FiSettings size={18} />
            <span>Settings</span>
          </div>
        </NavLink> */}

      </nav>

      {/* Logout */}
      <div className="merchant-sidebar-footer">
        <button
          onClick={() => (window.location.href = "/login")}
          className="btn-ghost"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            fontSize: "15px",
            cursor: "pointer",
            color: "#d9534f",
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
}
