import React, { useState } from "react";
import "../Account.css";

function ReviewForm({ order, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    if (comment.trim() === "") {
      alert("Please write a comment");
      return;
    }

    onSubmit({
      orderId: order.id,
      rating,
      comment,
    });

    // Reset form
    setRating(0);
    setComment("");
    onClose();
  };

  return (
    <div className="review-form-overlay">
      <div className="review-form-modal">
        {/* Header */}
        <div className="review-form-header">
          <h3>Write a Review</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          {/* Order Info */}
          <div className="review-order-info">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Order Date:</strong> {order.shippedDate}
            </p>
          </div>

          {/* Rating */}
          <div className="review-field">
            <label className="review-label">Rating *</label>
            <div className="review-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${
                    star <= (hoverRating || rating) ? "active" : ""
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{ cursor: "pointer", fontSize: "24px" }}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="review-rating-text">
              {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
            </p>
          </div>

          {/* Comment */}
          <div className="review-field">
            <label className="review-label">Your Review *</label>
            <textarea
              className="review-textarea"
              placeholder="Share your experience with this product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="5"
            />
            <p className="review-char-count">
              {comment.length}/500 characters
            </p>
          </div>

          {/* Actions */}
          <div className="review-form-actions">
            <button type="button" className="review-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="review-btn-submit">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;
