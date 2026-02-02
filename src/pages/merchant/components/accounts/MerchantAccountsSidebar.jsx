import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../../../shared/api/axios";
import { FiBox, FiHeart, FiUser, FiHome, FiLogOut, FiChevronRight } from "react-icons/fi";

function MerchantAccountSidebar({ activeTab, setActiveTab }) {
  const { user } = useSelector((state) => state.auth);
  const [merchantData, setMerchantData] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchMerchantData();
    }
  }, [user?.id]);

  const fetchMerchantData = async () => {
    try {
      const response = await axios.get(`/api/merchants/${user.id}`);
      setMerchantData(response.data);
    } catch (err) {
      console.error("Failed to fetch merchant data:", err);
    }
  };

  const menuItems = [
    { key: "personal", label: "Personal Data", icon: <FiUser /> },
    { key: "address", label: "Addresses", icon: <FiHome /> },
  ];

  return (
    <div className="sidebar-card">

      {/* USER TITLE */}
      <h6 className="sidebar-title">Welcome, {merchantData?.firstname || ""} {merchantData?.lastname || ""}</h6>

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

        

      </ul>
    </div>
  );
}

export default MerchantAccountSidebar;
