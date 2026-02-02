import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../shared/common/navbar/Navbar";
import "./cart.css";
import OrderSummary from "./OrderSummary";
import PromoCode from "./PromoCode";
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
  clearCartAPI,
} from "../../app/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleDecrease = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      dispatch(
        updateCartItem({
          cartItemId: item.cartItemId,
          quantity: item.quantity - 1,
        }),
      );
    }
  };

  const handleIncrease = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch(
        updateCartItem({
          cartItemId: item.cartItemId,
          quantity: item.quantity + 1,
        }),
      );
    }
  };

  const handleRemove = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch(removeCartItem(item.cartItemId));
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCartAPI());
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="cart-shell">
          <div className="cart-header-row">
            <div>
              <h2 className="cart-title">Cart</h2>
              <p className="cart-subtitle">
                View and manage all listed products easily.
              </p>
            </div>
            <div className="cart-header-right">
              <input
                type="text"
                placeholder="Search product..."
                className="cart-search-input"
              />
            </div>
          </div>

          <div className="cart-layout">
            {/* Left: product list */}
            <div className="cart-products">
              <div className="cart-products-header">
                <div>
                  <span className="cart-products-title">Product</span>
                  <span className="cart-products-meta">
                    There are {cartItems.length} product
                    {cartItems.length !== 1 ? "s" : ""} in your cart
                  </span>
                </div>
                {cartItems.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="cart-clear-btn"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#f59e0b",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "500",
                      padding: "0",
                      textDecoration: "none",
                    }}
                  >
                    Clear cart
                  </button>
                )}
              </div>

              {cartItems.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    color: "#6b7280",
                  }}
                >
                  <p style={{ fontSize: "16px", margin: "0 0 8px" }}>
                    Your cart is empty
                  </p>
                  <p style={{ fontSize: "14px" }}>
                    Add some products to get started!
                  </p>
                </div>
              ) : (
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item-card">
                      <div className="cart-item-main">
                        <div className="cart-item-image-wrap">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="cart-item-image"
                          />
                        </div>
                        <div className="cart-item-info">
                          <h4 className="cart-item-name">{item.name}</h4>
                          <p className="cart-item-meta">
                            Size: {item.size || "-"} &nbsp;•&nbsp; Color:{" "}
                            {item.color || item.category || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="cart-item-actions">
                        <div className="cart-item-price">₹{item.price}</div>
                        <div className="cart-qty-control">
                          <button
                            className="cart-qty-btn"
                            onClick={() => handleDecrease(item.id)}
                          >
                            −
                          </button>
                          <span className="cart-qty-value">
                            {item.quantity}
                          </span>
                          <button
                            className="cart-qty-btn"
                            onClick={() => handleIncrease(item.id)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="cart-remove-btn"
                          onClick={() => handleRemove(item.id)}
                          aria-label="Remove item"
                        >
                          <span
                            className="material-icons"
                            style={{ fontSize: "20px" }}
                          >
                            delete_outline
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: promo + order summary */}
            <div className="cart-sidebar">
              <PromoCode />
              <OrderSummary cartItems={cartItems} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
