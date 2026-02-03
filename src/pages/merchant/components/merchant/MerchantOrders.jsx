import React, { useState, useEffect } from "react";
import { getOrders } from "../../../../services/apiService";
import "../../Merchant.css";

function MerchantOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      
      // Transform API response to match table format
      const transformedOrders = response.map((order, index) => ({
        id: order._id || `ORD-${index + 1}`,
        orderId: order.orderId || order._id?.substring(0, 8) || `ORD-${index + 1}`,
        customerName: order.customerName || "Unknown",
        totalAmount: order.totalAmount || 0,
        status: order.status || "Pending",
        date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A",
        items: order.items?.length || 0,
      }));

      setOrders(transformedOrders);
      setError("");
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return "#28a745";
      case "pending":
      case "processing":
        return "#ffc107";
      case "cancelled":
      case "failed":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  return (
    <div className="merchant-orders-page">

      {/* Header */}
      <div className="merchant-header">
        <h2>Orders</h2>
      </div>

      {error && (
        <div className="alert alert-warning" style={{ marginBottom: "20px" }}>
          {error}
        </div>
      )}

      {/* Orders Table */}
      <div className="merchant-card products-card">

        {loading ? (
          <p style={{ textAlign: "center", padding: "20px" }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p style={{ textAlign: "center", padding: "20px" }}>
            No orders yet
          </p>
        ) : (
          <table className="table-modern">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="table-row">

                  <td>
                    <span style={{ fontWeight: "bold", color: "#007bff" }}>
                      {order.orderId}
                    </span>
                  </td>

                  <td>{order.customerName}</td>

                  <td>{order.items}</td>

                  <td>₹{order.totalAmount.toLocaleString()}</td>

                  <td>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        backgroundColor: getStatusColor(order.status),
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>{order.date}</td>

                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}

export default MerchantOrders;
