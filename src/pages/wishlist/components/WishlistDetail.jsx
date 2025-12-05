import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlistById, deleteWishlist, removeProductFromWishlist, removeCollaborator } from '../../../app/slices/wishlistSlice';
import Navbar from '../../../shared/common/navbar/Navbar';
import InviteCollaboratorModal from './InviteCollaboratorModal';
import './WishlistDetail.css';

function WishlistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentWishlist, loading } = useSelector((state) => state.wishlists);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [currentUser] = useState({ _id: 'current-user-id', username: 'Current User' }); // TODO: Get from auth state

  useEffect(() => {
    if (id) {
      dispatch(fetchWishlistById(id));
    }
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this wishlist?')) {
      try {
        await dispatch(deleteWishlist(id)).unwrap();
        navigate('/wishlist');
      } catch (error) {
        alert(error.message || 'Failed to delete wishlist');
      }
    }
  };

  const handleRemoveProduct = async (productId) => {
    if (window.confirm('Remove this product from wishlist?')) {
      try {
        await dispatch(removeProductFromWishlist({ wishlistId: id, productId })).unwrap();
      } catch (error) {
        alert(error.message || 'Failed to remove product');
      }
    }
  };

  const handleRemoveCollaborator = async (userId) => {
    if (window.confirm('Remove this collaborator?')) {
      try {
        await dispatch(removeCollaborator({ wishlistId: id, userId })).unwrap();
      } catch (error) {
        alert(error.message || 'Failed to remove collaborator');
      }
    }
  };

  const isOwner = currentWishlist?.createdBy === currentUser._id;

  if (loading) {
    return (
      <div className="wishlist-detail-loading">
        <p>Loading wishlist...</p>
      </div>
    );
  }

  if (!currentWishlist) {
    return (
      <div className="wishlist-detail-error">
        <p>Wishlist not found</p>
        <button onClick={() => navigate('/wishlist')}>Back to Wishlists</button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="wishlist-detail-page">
      <div className="wishlist-detail-header">
        <button className="back-btn" onClick={() => navigate('/wishlist')}>
          <span className="material-icons">arrow_back</span>
          Back
        </button>
        <div className="wishlist-detail-actions">
          {isOwner && (
            <>
              <button className="btn-secondary" onClick={() => setShowInviteModal(true)}>
                <span className="material-icons">person_add</span>
                Invite Collaborator
              </button>
              <button className="btn-danger" onClick={handleDelete}>
                <span className="material-icons">delete</span>
                Delete Wishlist
              </button>
            </>
          )}
        </div>
      </div>

      <div className="wishlist-detail-content">
        <div className="wishlist-detail-info">
          <h1>{currentWishlist.name}</h1>
          <p className="wishlist-detail-description">{currentWishlist.description || 'No description'}</p>
          <div className="wishlist-detail-meta">
            <span>Created by {currentWishlist.createdByUsername}</span>
            <span>•</span>
            <span>{currentWishlist.products?.length || 0} products</span>
            <span>•</span>
            <span>{currentWishlist.members?.length || 1} member{(currentWishlist.members?.length || 1) !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="wishlist-detail-sections">
          <section className="collaborators-section">
            <h2>Collaborators</h2>
            <div className="collaborators-list">
              <div className="collaborator-item">
                <div className="collaborator-avatar">
                  {currentWishlist.createdByUsername?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="collaborator-info">
                  <span className="collaborator-name">{currentWishlist.createdByUsername} (Owner)</span>
                </div>
              </div>
              {currentWishlist.memberUsernames?.map((username, idx) => {
                const memberId = currentWishlist.members?.[idx];
                return (
                  <div key={memberId || idx} className="collaborator-item">
                    <div className="collaborator-avatar">
                      {username?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="collaborator-info">
                      <span className="collaborator-name">{username}</span>
                    </div>
                    {isOwner && (
                      <button
                        className="remove-collaborator-btn"
                        onClick={() => handleRemoveCollaborator(memberId)}
                      >
                        <span className="material-icons">close</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="products-section">
            <h2>Products ({currentWishlist.products?.length || 0})</h2>
            {currentWishlist.products?.length > 0 ? (
              <div className="products-grid">
                {currentWishlist.products.map((product) => (
                  <div key={product._id} className="product-item">
                    <div className="product-image">
                      <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-price">₹{product.price}</p>
                      <p className="product-added-by">
                        Added by {product.addedByUsername}
                      </p>
                    </div>
                    <button
                      className="remove-product-btn"
                      onClick={() => handleRemoveProduct(product._id)}
                    >
                      <span className="material-icons">delete_outline</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-products">
                <p>No products in this wishlist yet</p>
              </div>
            )}
          </section>
        </div>
      </div>

      <InviteCollaboratorModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        wishlistId={id}
      />
      </div>
    </>
  );
}

export default WishlistDetail;

