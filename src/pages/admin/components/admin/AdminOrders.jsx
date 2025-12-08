import React from "react";
import "../../Admin.css";

function Orders() {
  const orders = [
    {
      id: "O-201",
      merchant: "Rohit Patil",
      customer: "Jay Raut",
      totalItems: 3,
      amount: 1299,
      status: "Delivered",
    },
    {
      id: "O-202",
      merchant: "Ajay Sharma",
      customer: "Om Patil",
      totalItems: 5,
      amount: 2499,
      status: "Pending",
    },
    {
      id: "O-203",
      merchant: "Karan Patel",
      customer: "Siddhi Sathe",
      totalItems: 1,
      amount: 499,
      status: "Shipped",
    },
    {
      id: "O-204",
      merchant: "Sneha Verma",
      customer: "Shree Kumar",
      totalItems: 2,
      amount: 899,
      status: "Delivered",
    },
  ];

  return (
    <div className="merchant-products-page">
      <div className="merchant-header">
        <h2>Orders</h2>
      </div>

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
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="table-row">
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.merchant}</td>
                <td>{order.totalItems}</td>
                <td>₹{order.amount.toLocaleString()}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
