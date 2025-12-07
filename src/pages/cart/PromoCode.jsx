import React from "react";

function PromoCode() {
  return (
    <div className="promo-card">
      <h3 className="promo-title">Have a Promo Code ?</h3>
      <p className="promo-subtitle">Apply it here!</p>

      <div className="promo-input-wrap">
        <input
          type="text"
          placeholder="Enter Promo Code"
          className="promo-input"
        />
        <button className="promo-apply-btn">Apply</button>
      </div>
    </div>
  );
}

export default PromoCode;


