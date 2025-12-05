import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <header className="header">
                <div className="d-flex">
                    {/* Logo */}
                    <Link to="/">
                        <div className="logo me-5 d-center">Vanilo</div>
                    </Link>

                    {/* Address */}
                    <div className="address">
                        <p className="address-line1">Deliver to</p>
                        <p className="address-line2">Pune, Maharashtra</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="search-bar">
                    <input type="text" placeholder="Search for products..." />
                    <span className="material-icons search-icon">search</span>
                </div>

                {/* Icons */}
                <div className="icons">
                    <Link to="/wishlist">
                        <span className="material-icons icon" title="Wishlist">favorite_border</span>
                    </Link>
                    <Link to="/cart">
                        <span className="material-icons icon" title="Cart">shopping_cart</span>
                    </Link>
                                        <Link to="/account">
                        <span className="material-icons icon" title="Account">account_circle</span>
                    </Link>
                </div>
            </header>
        </div>
    );
}

export default Navbar;
