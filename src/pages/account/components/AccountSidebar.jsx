import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../../shared/api/axios";
import {
  FiBox,
  FiHeart,
  FiUser,
  FiHome,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";

function AccountSidebar({ activeTab, setActiveTab }) {
  const { user } = useSelector((state) => state.auth);
  const [customerData, setCustomerData] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchCustomerData();
    }
  }, [user?.id]);

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`/api/customers/${user.id}`);
      setCustomerData(response.data);
    } catch (err) {
      console.error("Failed to fetch customer data:", err);
    }
  };

  const menuItems = [
    { key: "orders", label: "Orders", icon: <FiBox /> },
    { key: "wishlist", label: "Favorites", icon: <FiHeart /> },
    { key: "personal", label: "Personal Data", icon: <FiUser /> },
    { key: "address", label: "Addresses", icon: <FiHome /> },
  ];

  return (
    <div className="sidebar-card">
      {/* USER TITLE */}
      <h6 className="sidebar-title">Welcome, {customerData?.firstname || ""} {customerData?.lastname || ""}</h6>

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
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/auth";
              }}
              className="btn btn-danger btn-sm me-2"
            >
              Yes
            </button>
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

export default AccountSidebar;
