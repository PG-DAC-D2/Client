import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchWishlists } from '../../app/slices/wishlistSlice';
import Navbar from '../../shared/common/navbar/Navbar';
import WishlistCard from './components/WishlistCard';
import CreateWishlistModal from './components/CreateWishlistModal';
import './Wishlist.css';

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: wishlists, loading } = useSelector((state) => state.wishlists);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentUser] = useState({ username: 'User' }); // TODO: Get from auth state

  useEffect(() => {
    dispatch(fetchWishlists());
  }, [dispatch]);

  const handleLogout = () => {
    // TODO: Implement logout logic
    alert('Logout functionality to be implemented');
  };

  return (
    <>
      <Navbar />
      <div className="wishlist-page">
        <div className="wishlist-container">
          <header className="wishlist-header">
            <div className="wishlist-welcome">
              <h1>Welcome {currentUser.username}!</h1>
            </div>
            <div className="wishlist-header-actions">
              <button
                className="btn-create-wishlist"
                onClick={() => setShowCreateModal(true)}
              >
                <span className="material-icons">add</span>
                Create Wishlist
              </button>
              <button className="btn-logout" onClick={handleLogout}>
                LOGOUT
              </button>
            </div>
          </header>

          {loading ? (
            <div className="wishlist-loading">
              <p>Loading wishlists...</p>
            </div>
          ) : wishlists.length > 0 ? (
            <div className="wishlist-grid">
              {wishlists.map((wishlist) => (
                <WishlistCard key={wishlist._id} wishlist={wishlist} />
              ))}
            </div>
          ) : (
            <div className="wishlist-empty">
              <div className="empty-state">
                <span className="material-icons empty-icon">favorite_border</span>
                <h2>No wishlists yet</h2>
                <p>Create your first wishlist to get started!</p>
                <button
                  className="btn-create-wishlist-empty"
                  onClick={() => setShowCreateModal(true)}
                >
                  <span className="material-icons">add</span>
                  Create Your First Wishlist
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <CreateWishlistModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  );
}

export default Wishlist;
