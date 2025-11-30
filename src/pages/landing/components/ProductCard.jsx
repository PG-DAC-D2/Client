import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ _id, imageUrl, name, tags, rating, review, sizes, rate, onAddToCart }) {
  const navigate = useNavigate();

  // handle card click
  const handleCardClick = () => {
    navigate(`/product/${_id}`);
  };

  // stop click event from bubbling when Add to cart is clicked
  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log("Add to cart clicked for product ID:", _id);
    // if (onAddToCart) onAddToCart(_id);
  };

  return (
    <div className="product-card2" onClick={handleCardClick}>
      <div className="img-box">
        <img src={imageUrl[0]} alt={name} />
      </div>
      <div className="product-info">
        <h4>{name}</h4>
        <p className="category">{tags[0]}</p>
        <div className="rating">
          <span className="material-icons star">star</span>
          <span>{rating}</span>
          <span className="reviews">( {review} )</span>
        </div>
        <div className="sizes">
          {sizes.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="price-cart">
          <p className="price">₹{rate}</p>
          <button className="cart-btn" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
