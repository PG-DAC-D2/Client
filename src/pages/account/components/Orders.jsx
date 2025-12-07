import React from "react";
import "./../../account/Account.css";

const orders = [
  {
    id: "7681029",
    shippedDate: "30 March 2019",
    total: 78.0,
    status: "Delivered",
    products: [
      "https://plus.unsplash.com/premium_photo-1691030254390-aa56b22e6a45?auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1740711152088-88a009e877bb?auto=format&fit=crop&w=880&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1470&q=80",
    ],
  },
  {
    id: "7681983",
    shippedDate: "30 March 2019",
    total: 78.0,
    status: "Out for delivery",
    products: [
      "https://images.unsplash.com/photo-1634316427425-722247ebe036?auto=format&fit=crop&w=1632&q=80",
    ],
  },
];

function Orders() {
  return (
    <div className="section-card">

      {/* Title */}
      <h4 className="fw-bold mb-4">Orders</h4>

      {orders.map((order, index) => (
        <div className="order-card mb-4" key={index}>

          {/* LEFT PRODUCT IMAGES */}
          <div className="order-left">
            {order.products.map((img, idx) => (
              <div className="thumb" key={idx}>
                <img src={img} alt="product" />
              </div>
            ))}
          </div>

          {/* ORDER DETAILS */}
          <div className="order-info">

            <p className="order-label">
              Order number:
              <span className="order-value ms-1">{order.id}</span>
            </p>

            <p className="order-label">
              Shipped date:
              <span className="order-value ms-1">{order.shippedDate}</span>
            </p>

            <p className="order-total">₹{order.total}</p>

            <p className="order-label">
              Status:
              <span
                className={
                  order.status === "Delivered"
                    ? "status-badge status-delivered ms-2"
                    : "status-badge status-processing ms-2"
                }
              >
                {order.status}
              </span>
            </p>

          </div>

          {/* RIGHT SIDE ACTION BUTTON */}
          <div className="order-actions d-flex flex-column justify-content-center">
            {order.status === "Delivered" ? (
              <button className="order-btn">VIEW ORDER</button>
            ) : (
              <>
                <button className="order-btn mb-2">TRACK ORDER</button>
                <button className="order-btn cancel">Cancel</button>
              </>
            )}
          </div>

        </div>
      ))}
    </div>
  );
}

export default Orders;
