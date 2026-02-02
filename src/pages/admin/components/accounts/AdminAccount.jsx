import React, { useState } from "react";
import "./AdminAccount.css";
import AdminPersonalInfo from "./AdminPersonalInfo";
import Address from "../../../account/components/Address";
import AdminNavbar from "../common/AdminNavbar";
import AdminAccountSidebar from "./AdminAccountSidebar";

function AdminAccount() {
  const [activeTab, setActiveTab] = useState("orders");

  // Render selected tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "address":
        return <Address />;
      default:
        return <AdminPersonalInfo />;
    }
  };

  return (
    <>
      <AdminNavbar />

      {/* TOP SPACING (prevents navbar overlap) */}
      <div style={{ height: "90px" }} />

      {/* PAGE BACKGROUND (Shopy Style) */}
      <div className="account-page-bg">

        {/* MAIN CONTAINER (matches Landing page width style) */}
        <div className="account-container">

          {/* PAGE TITLE */}
          <h3 className="account-title">My Account</h3>

          {/* MAIN GRID */}
          <div className="row g-4">

            {/* LEFT SIDEBAR */}
            <div className="col-lg-3 col-md-4">
              <AdminAccountSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="col-lg-9 col-md-8">
              <div className="account-right-card">
                {renderTabContent()}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAccount;
