import React from "react";
import Navbar from "../../shared/common/navbar/Navbar";
import "./Merchant.css";
import Sidebar from "./components/common/Sidebar";
import { Outlet } from "react-router-dom";
import MerchantNavbar from "./components/common/MerchantNavbar";

function Admin() {
  return (
    <>
      <MerchantNavbar />

      {/* Space below fixed navbar */}
      <div className="merchant-nav-spacer" />

      <div className="merchant-page-bg">
        <div className="merchant-container">
          <div className="row gx-4 gy-4">
            {/* Sidebar */}
            <div className="col-lg-3 col-md-4">
              <aside className="merchant-sidebar-card">
                <Sidebar />
              </aside>
            </div>

            {/* Main content */}
            <div className="col-lg-9 col-md-8">
              <main className="merchant-content-card">
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
