import React from "react";

function OrderSummary({ cartItems = [] }) {
  const subTotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  const discount = 60; // static for now
  const delivery = 0;
  const tax = 20;
  const total = Math.max(0, subTotal - discount + delivery + tax);

  return (
    <div className="cart-order-card">
      <h3 className="cart-order-title">Order Summary</h3>

      <div className="cart-order-row">
        <span>Sub Total :</span>
        <span>₹{subTotal.toFixed(2)}</span>
      </div>
      <div className="cart-order-row">
        <span>Discount :</span>
        <span className="cart-order-discount">-₹{discount.toFixed(2)}</span>
      </div>
      <div className="cart-order-row">
        <span>Delivery Charge :</span>
        <span>₹{delivery.toFixed(2)}</span>
      </div>
      <div className="cart-order-row">
        <span>Estimated Tax :</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>

      <div className="cart-order-row cart-order-total-row">
        <span>Total Amount</span>
        <span className="cart-order-total">₹{total.toFixed(2)}</span>
      </div>

      <button className="cart-checkout-btn">Checkout</button>
    </div>
  );
}

export default OrderSummary;


