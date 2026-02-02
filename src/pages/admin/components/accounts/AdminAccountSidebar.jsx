import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../../../shared/api/axios";
import { FiBox, FiHeart, FiUser, FiHome, FiLogOut, FiChevronRight } from "react-icons/fi";
import { logout } from "../../../../app/slices/authSlice";

function AdminAccountSidebar({ activeTab, setActiveTab }) {
  const { user } = useSelector((state) => state.auth);
  const [adminData, setAdminData] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      fetchAdminData();
    }
  }, [user?.id]);

  const fetchAdminData = async () => {
    try {
      const response = await axios.get(`/api/admin/${user.id}`);
      setAdminData(response.data);
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    }
  };

  const menuItems = [
    { key: "personal", label: "Personal Data", icon: <FiUser /> },
    { key: "address", label: "Addresses", icon: <FiHome /> },
  ];

  return (
    <div className="sidebar-card">

      {/* USER TITLE */}
      <h6 className="sidebar-title">Welcome, {adminData?.firstname || ""} {adminData?.lastname || ""}</h6>

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
              className="btn btn-danger btn-sm me-2"
              onClick={() => {
                dispatch(logout());
                setShowLogoutConfirm(false);
                navigate('/auth');
              }}
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

export default AdminAccountSidebar;
