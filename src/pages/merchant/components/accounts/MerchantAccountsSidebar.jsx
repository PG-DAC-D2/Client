import React, { useState } from "react";
import { FiBox, FiHeart, FiUser, FiHome, FiLogOut, FiChevronRight } from "react-icons/fi";

function MerchantAccountSidebar({ activeTab, setActiveTab }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    { key: "personal", label: "Personal Data", icon: <FiUser /> },
    { key: "address", label: "Addresses", icon: <FiHome /> },
  ];

  return (
    <div className="sidebar-card">

      {/* USER TITLE */}
      <h6 className="sidebar-title">Welcome, John Doe</h6>

      {/* SIDEBAR LIST */}
      <ul className="sidebar-list">

        {menuItems.map((item) => (
          <li
            key={item.key}
            className={`sidebar-item ${activeTab === item.key ? "active" : ""}`}
            onClick={() => setActiveTab(item.key)}
          >
            <div className="sidebar-left">
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <span className="sidebar-arrow">›</span>
          </li>
        ))}

        {/* SIGN OUT BUTTON */}
        <li
          className="sidebar-item logout"
          onClick={() => setShowLogoutConfirm(!showLogoutConfirm)}
        >
          <div className="sidebar-left">
            <span className="sidebar-icon">↩</span>
            <span>Sign out</span>
          </div>
        </li>

        {/* LOGOUT DROP-DOWN MESSAGE */}
        {showLogoutConfirm && (
          <div className="logout-dropdown">
            <p className="mb-2">Are you sure you want to sign out?</p>
            <button className="btn btn-danger btn-sm me-2">Yes</button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowLogoutConfirm(false)}
            >
              Cancel
            </button>
          </div>
        )}

      </ul>
    </div>
  );
}

export default MerchantAccountSidebar;
