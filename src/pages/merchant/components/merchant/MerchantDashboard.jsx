import React, { useState, useEffect } from "react";
import { getProducts, getOrders } from "../../../../services/apiService";
import "../../Merchant.css";

export default function MerchantDashboard() {
  const [topProducts, setTopProducts] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [stats, setStats] = useState([
    { title: "Total Products", value: "0", loading: true },
    { title: "Total Orders", value: "0", loading: true },
    { title: "Total Sales", value: "₹ 0", loading: true }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products and orders from API on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [productsResponse, ordersResponse] = await Promise.all([
        getProducts(),
        getOrders()
      ]);
      
      // Calculate statistics from products
      const totalProducts = productsResponse.length;
      const totalSalesAmount = productsResponse.reduce((sum, product) => {
        return sum + ((product.rate || 0) * (product.review || 0));
      }, 0);
      
      // Calculate orders from orders endpoint or from product reviews
      const totalOrders = ordersResponse.length > 0 
        ? ordersResponse.length 
        : productsResponse.reduce((sum, product) => sum + (product.review || 0), 0);

      // Update stats
      setStats([
        { title: "Total Products", value: totalProducts.toString(), loading: false },
        { title: "Total Orders", value: totalOrders.toLocaleString(), loading: false },
        { title: "Total Sales", value: `₹ ${totalSalesAmount.toLocaleString()}`, loading: false }
      ]);

      // Transform API response to match dashboard format
      const transformedProducts = productsResponse.map((product) => ({
        id: product._id,
        name: product.name,
        sales: product.review || 0,
        price: product.rate,
        image: product.imageUrl?.[0] || "https://via.placeholder.com/100",
      }));

      // Get top 5 products
      const top5 = transformedProducts.sort((a, b) => b.sales - a.sales).slice(0, 5);
      setTopProducts(top5);
      setPieChartData(top5);

      
      setError("");
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
      // Keep default products in case of error
      const defaultProducts = [
        { name: "Blue T-Shirt", sales: 120 },
        { name: "Casual Sneakers", sales: 95 },
        { name: "Denim Jeans", sales: 80 },
        { name: "Black Sunglasses", sales: 58 },
        { name: "Leather Backpack", sales: 42 }
      ];
      setTopProducts(defaultProducts);
      setPieChartData(defaultProducts);
    } finally {
      setLoading(false);
    }
  };

  // Refresh dashboard when navigation returns to dashboard
  useEffect(() => {
    const handleRefresh = () => {
      fetchDashboardData();
    };

    window.addEventListener("focus", handleRefresh);
    return () => window.removeEventListener("focus", handleRefresh);
  }, []);

  // Calculate pie chart dimensions and positions
  const PieChart = ({ data }) => {
    if (!data || data.length === 0) return null;

    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
    const totalSales = data.reduce((sum, item) => sum + (item.sales || 0), 0);
    let currentAngle = -90;

    const slices = data.map((item, index) => {
      const percentage = totalSales > 0 ? (item.sales / totalSales) * 100 : 0;
      const sliceAngle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;

      // Convert angles to radians
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      // Calculate arc path
      const radius = 80;
      const x1 = 100 + radius * Math.cos(startRad);
      const y1 = 100 + radius * Math.sin(startRad);
      const x2 = 100 + radius * Math.cos(endRad);
      const y2 = 100 + radius * Math.sin(endRad);

      const largeArc = sliceAngle > 180 ? 1 : 0;
      const pathData = `M 100 100 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      currentAngle = endAngle;

      return (
        <g key={index}>
          <path d={pathData} fill={colors[index]} stroke="white" strokeWidth="2" />
        </g>
      );
    });

    return (
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <svg width="250" height="250" viewBox="0 0 200 200">
          {slices}
        </svg>
      </div>
    );
  };
  

  return (
    <div className="merchant-dashboard">

      <div className="merchant-header">
        <h2>Overview</h2>
      </div>

      {error && (
        <div className="alert alert-warning" style={{ marginBottom: "20px" }}>
          {error}
        </div>
      )}

      {/* Stats Row */}
      <div className="dashboard-stats-row">
        {stats.map((item, i) => (
          <div key={i} className="dashboard-stat-card">
            <p className="stat-title">{item.title}</p>
            <h2 className="stat-value">
              {item.loading ? "Loading..." : item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Chart & Top Products */}
      <div className="dashboard-main-grid">

        {/* Pie Chart */}
        <div className="dashboard-card">
          <p className="section-title">Top 5 Products Sales Distribution</p>

          {loading ? (
            <p style={{ textAlign: "center", padding: "20px" }}>Loading chart...</p>
          ) : (
            <>
              <PieChart data={pieChartData} />
              
              {/* Legend */}
              <div style={{ marginTop: "20px" }}>
                {pieChartData.map((product, i) => {
                  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
                  const totalSales = pieChartData.reduce((sum, item) => sum + (item.sales || 0), 0);
                  const percentage = totalSales > 0 ? ((product.sales / totalSales) * 100).toFixed(1) : 0;
                  
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "10px", fontSize: "14px" }}>
                      <div 
                        style={{ 
                          width: "16px", 
                          height: "16px", 
                          backgroundColor: colors[i], 
                          borderRadius: "3px",
                          marginRight: "10px"
                        }}
                      ></div>
                      <span style={{ flex: 1 }}>{product.name}</span>
                      <span style={{ fontWeight: "bold", marginLeft: "10px" }}>{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Top Products List */}
        <div className="dashboard-card top-products-section">
          <p className="section-title">Top 5 Products</p>

          {loading ? (
            <p style={{ textAlign: "center", padding: "20px" }}>Loading products...</p>
          ) : (
            <ul>
              {topProducts.map((product, i) => (
                <li key={i} className="top-product-item">
                  <span>{product.name}</span>
                  <span className="sales-count">{product.sales} sales</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>

      
    </div>
  );
}
