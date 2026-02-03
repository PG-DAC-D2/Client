import React, { useState, useEffect } from "react";
import "./../../account/Account.css";
import ReviewForm from "./ReviewForm";
import api from "../../../shared/api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/api/orders/my");
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Could not load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleReviewClick = (order) => {
    setSelectedOrder(order);
    setShowReviewForm(true);
  };

  const handleReviewSubmit = (reviewData) => {
    console.log("Review submitted:", reviewData);
    // TODO: Send review to API
    alert("Thank you for your review!");
  };

  return (
    <>
      <div className="section-card">

        {/* Title */}
        <h4 className="fw-bold mb-4">Orders</h4>

        {loading ? (
          <p>Loading orders…</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div className="order-card mb-4" key={order.orderId || index}>

              {/* LEFT PRODUCT IMAGES */}
              <div className="order-left">
                {(order.items || order.Items || []).slice(0, 3).map((it, idx) => (
                  <div className="thumb" key={idx}>
                    <img src={it.image || it.imageUrl || ""} alt="product" />
                  </div>
                ))}
              </div>

              {/* ORDER DETAILS */}
              <div className="order-info">

                <p className="order-label">
                  Order number:
                  <span className="order-value ms-1">{order.orderId || order.orderID || order.OrderId}</span>
                </p>

                <p className="order-label">
                  Shipped date:
                  <span className="order-value ms-1">{new Date(order.createdAt || order.CreatedAt || order.shippedDate || "").toLocaleDateString()}</span>
                </p>

                <p className="order-total">₹{(order.totalAmount || order.TotalAmount || 0).toFixed(2)}</p>

                <p className="order-label">
                  Status:
                  <span
                    className={
                      (order.status || order.Status) === "Delivered"
                        ? "status-badge status-delivered ms-2"
                        : "status-badge status-processing ms-2"
                    }
                  >
                    {order.status || order.Status}
                  </span>
                </p>

              </div>

              {/* RIGHT SIDE ACTION BUTTON */}
              <div className="order-actions d-flex flex-column justify-content-center">
                {(order.status || order.Status) === "Delivered" ? (
                  <>
                    <button className="order-btn mb-2">VIEW ORDER</button>
                    <button className="order-btn" onClick={() => handleReviewClick(order)}>Review</button>
                  </>
                ) : (
                  <>
                    <button className="order-btn mb-2">TRACK ORDER</button>
                    <button className="order-btn cancel">Cancel</button>
                  </>
                )}
              </div>

            </div>
          ))
        )}

      </div>

      {/* Review Form Modal */}
      {showReviewForm && selectedOrder && (
        <ReviewForm
          order={selectedOrder}
          onClose={() => setShowReviewForm(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </>
  );
}

export default Orders;
