import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WishlistCard.css';

function WishlistCard({ wishlist }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/wishlist/${wishlist._id}`);
  };

  return (
    <div className="wishlist-card" onClick={handleClick}>
      <div className="wishlist-banner">
        {wishlist.bannerImage ? (
          <img src={wishlist.bannerImage} alt={wishlist.name} />
        ) : (
          <div className="wishlist-banner-placeholder">
            <span className="material-icons">favorite</span>
          </div>
        )}
      </div>
      <div className="wishlist-card-content">
        <h3 className="wishlist-card-name">{wishlist.name}</h3>
        <p className="wishlist-card-description">{wishlist.description || 'No description'}</p>
        <div className="wishlist-card-meta">
          <span className="wishlist-meta-item">
            <span className="material-icons">inventory_2</span>
            {wishlist.products?.length || 0} items
          </span>
          <span className="wishlist-meta-item">
            <span className="material-icons">people</span>
            {wishlist.members?.length || 1} member{(wishlist.members?.length || 1) !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;

