import React from "react";

function OrderSummary({ cartItems = [] }) {
  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const discount = 60; // static for now
  const delivery = 0;
  const tax = 20;
  const total = subTotal - discount + delivery + tax;

  return (
    <div className="order-card">
      <h3 className="order-title">Order Summary</h3>

      <div className="order-row">
        <span>Sub Total :</span>
        <span>₹{subTotal.toFixed(2)}</span>
      </div>
      <div className="order-row">
        <span>Discount :</span>
        <span className="order-discount">-₹{discount.toFixed(2)}</span>
      </div>
      <div className="order-row">
        <span>Delivery Charge :</span>
        <span>₹{delivery.toFixed(2)}</span>
      </div>
      <div className="order-row">
        <span>Estimated Tax :</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>

      <div className="order-row order-total-row">
        <span>Total Amount</span>
        <span className="order-total">₹{total.toFixed(2)}</span>
      </div>

      <button className="checkout-btn">Checkout</button>
    </div>
  );
}

export default OrderSummary;


