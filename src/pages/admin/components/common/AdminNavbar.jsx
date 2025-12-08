import React from "react";
import "./AdminNavbar.css";
import { Link } from "react-router-dom";

function AdminNavbar() {
    return (
        <div>
            <header className="header">
                <div className="d-flex">
                    {/* Logo */}
                    <Link to="/">
                        <div className="logo me-5 d-center">Vanilo</div>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="search-bar">
                    <input type="text" placeholder="Search for products..." />
                    <span className="material-icons search-icon">search</span>
                </div>

                {/* Icons */}
                <div className="icons">
                    <Link to="/admin/account">
                        <span className="material-icons icon" title="Account">account_circle</span>
                    </Link>
                </div>
            </header>
        </div>
    );
}

export default AdminNavbar;
