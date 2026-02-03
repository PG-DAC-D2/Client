import React, { useEffect, useState } from "react";
import "../../Admin.css";
import { getOrders } from "../../../../services/apiService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders();
      setOrders(res || []);
      setError("");
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="merchant-products-page">
      <div className="merchant-header">
        <h2>Orders</h2>
      </div>

      {error && <div className="alert alert-warning">{error}</div>}

      <div className="merchant-card products-card">
        <table className="table-modern">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Merchant Name</th>
              <th>Total Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan={7}>Loading...</td></tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id || order.id} className="table-row">
                  <td>{order._id || order.id}</td>
                  <td>{order.customerName || order.customer || order.buyerName || "-"}</td>
                  <td>{order.merchantName || order.merchant || "-"}</td>
                  <td>{order.items ? order.items.length : order.totalItems || "-"}</td>
                  <td>₹{(order.totalAmount || order.amount || 0).toLocaleString()}</td>
                  <td>{order.status || "-"}</td>
                  <td>{(order.createdAt || order.date || "").slice(0, 10)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
