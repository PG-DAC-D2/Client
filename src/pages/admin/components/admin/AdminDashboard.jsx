import React from "react";
import "../../Admin.css";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Sales", value: "₹ 1,24,560" },
    { title: "Orders", value: "1,234" },
    { title: "Profit", value: "₹ 62,300" },
  ];

  const chartData = [28, 42, 34, 60, 48, 76, 55, 44, 66, 58, 36, 68];

  const topProducts = [
    { name: "Blue T-Shirt", sales: 120 },
    { name: "Casual Sneakers", sales: 95 },
    { name: "Denim Jeans", sales: 80 },
    { name: "Black Sunglasses", sales: 58 },
    { name: "Leather Backpack", sales: 42 },
  ];

  return (
    <div className="merchant-dashboard">
      <div className="merchant-header">
        <h2>Overview</h2>
      </div>

      {/* Stats Row */}
      <div className="dashboard-stats-row">
        {stats.map((item, i) => (
          <div key={i} className="dashboard-stat-card">
            <p className="stat-title">{item.title}</p>
            <h2 className="stat-value">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Chart & Top Products */}
      <div className="dashboard-main-grid">
        {/* Chart */}
        <div className="dashboard-card">
          <p className="section-title">Sales Performance (Last 30 Days)</p>

          <div className="chart-wrapper">
            <div className="chart-bars-container">
              {chartData.map((value, i) => (
                <div
                  key={i}
                  className="chart-bar"
                  style={{ height: `${value * 2.2}px` }}
                  title={`${value} sales`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="dashboard-card top-products-section">
          <p className="section-title">Top 5 Products</p>

          <ul>
            {topProducts.map((product, i) => (
              <li key={i} className="top-product-item">
                <span>{product.name}</span>
                <span className="sales-count">{product.sales} sales</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
