import React from "react";
import "../../Admin.css";

function Analytics() {
  const analyticsData = [
    {
      id: "M-101",
      merchant: "Rohit Patil",
      totalSales: 44200,
      earnings: 320000,
      totalOrders: 210000,
      growth: "12%",
    },
    {
      id: "M-102",
      merchant: "Ajay Sharma",
      totalSales: 2890,
      earnings: 186000,
      totalOrders: 150,
      growth: "8%",
    },
    {
      id: "M-103",
      merchant: "Karan Patel",
      totalSales: 5122,
      earnings: 410500,
      totalOrders: 240,
      growth: "17%",
    },
    {
      id: "M-104",
      merchant: "Sneha Verma",
      totalSales: 3500,
      earnings: 230700,
      totalOrders: 180,
      growth: "10%",
    },
  ];

  // KPI Values (calculated from data)
  const totalSales = analyticsData.reduce((acc, m) => acc + m.totalSales, 0);
  const totalOrders = analyticsData.reduce((acc, m) => acc + m.totalOrders, 0);
  const totalEarnings = analyticsData.reduce((acc, m) => acc + m.earnings, 0);

  return (
    <div className="merchant-products-page">
      {/* Header */}
      <div className="merchant-header">
        <h2>Merchant Analytics</h2>
      </div>

      {/* KPI Cards */}
      <div className="analytics-cards-container">
        <div className="analytics-card">
          <h3>Total Sales</h3>
          <p>{totalSales}</p>
        </div>

        <div className="analytics-card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div className="analytics-card">
          <h3>Total Earnings</h3>
          <p>₹{totalEarnings.toLocaleString()}</p>
        </div>

        <div className="analytics-card">
          <h3>Overall Growth</h3>
          <p>14%</p>
        </div>
      </div>

      {/* Analytics Table */}
      <div className="merchant-card products-card">
        <table className="table-modern">
          <thead>
            <tr>
              <th>Merchant ID</th>
              <th>Merchant Name</th>
              <th>Total Sales</th>
              <th>Total Earnings</th>
              <th>Total Orders</th>
              <th>Growth</th>
            </tr>
          </thead>

          <tbody>
            {analyticsData.map((item) => (
              <tr key={item.id} className="table-row">
                <td>{item.id}</td>
                <td>{item.merchant}</td>
                <td>{item.totalSales}</td>
                <td>₹{item.earnings.toLocaleString()}</td>
                <td>{item.totalOrders}</td>
                <td>{item.growth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;
