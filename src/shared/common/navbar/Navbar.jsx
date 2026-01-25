import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate("/search", { state: { searchQuery: searchQuery.trim() } });
        } else {
            navigate("/search");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch(e);
        }
    };

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
                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button type="submit" className="search-icon-btn">
                        <span className="material-icons search-icon">search</span>
                    </button>
                </form>

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
