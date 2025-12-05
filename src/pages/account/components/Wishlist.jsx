import React from "react";
import "./../../account/Account.css";

const wishlistItems = [
  {
    id: 1,
    name: "Red T-Shirt",
    price: 499,
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 2199,
    img: "https://images.unsplash.com/photo-1520974735194-3d8b1a1a2b49?auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 3,
    name: "Beige Sweater",
    price: 899,
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3a30?auto=format&fit=crop&w=687&q=80",
  },
];

function Wishlist() {
  return (
    <div className="section-card">

      {/* Title */}
      <h4 className="fw-bold mb-4">Wishlist</h4>

      <div className="row">
        {wishlistItems.map((item) => (
          <div className="col-sm-6 col-md-4 mb-4" key={item.id}>

            {/* PRODUCT CARD */}
            <div className="product-card">

              {/* IMAGE WRAPPER */}
              <div className="img-wrap">
                <img src={item.img} alt={item.name} className="product-img" />

                {/* Overlay buttons */}
                <div className="img-overlay">
                  <button className="overlay-btn">Add to Cart</button>
                  <button className="overlay-btn outline">Remove</button>
                </div>
              </div>

              {/* BODY */}
              <div className="product-body">
                <div className="product-name">{item.name}</div>
                <div className="product-price">₹{item.price}</div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {wishlistItems.length === 0 && (
        <p className="text-muted">Your wishlist is empty.</p>
      )}
    </div>
  );
}

export default Wishlist;
