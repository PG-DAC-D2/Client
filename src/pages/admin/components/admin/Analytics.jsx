import React, { useEffect, useState } from "react";
import "../../Admin.css";
import { getProducts, getOrders } from "../../../../services/apiService";

function Analytics() {
  const [topProducts, setTopProducts] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [productsResponse, ordersResponse] = await Promise.all([getProducts(), getOrders()]);

      const computedTotalSales = productsResponse.reduce((sum, p) => sum + ((p.rate || 0) * (p.review || 0)), 0);
      const computedTotalOrders = ordersResponse.length || productsResponse.reduce((sum, p) => sum + (p.review || 0), 0);
      const computedTotalProducts = productsResponse.length;

      setTotalSales(computedTotalSales);
      setTotalOrders(computedTotalOrders);
      setTotalProducts(computedTotalProducts);

      const transformedProducts = productsResponse.map((product) => ({
        id: product._id,
        name: product.name,
        sales: product.review || 0,
      }));

      const top5 = transformedProducts.sort((a, b) => b.sales - a.sales).slice(0, 5);
      setTopProducts(top5);
      setPieChartData(top5);
      setError("");
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setError("Failed to load analytics data");
      const defaults = [
        { name: "Blue T-Shirt", sales: 120 },
        { name: "Casual Sneakers", sales: 95 },
        { name: "Denim Jeans", sales: 80 },
        { name: "Black Sunglasses", sales: 58 },
        { name: "Leather Backpack", sales: 42 },
      ];
      setTopProducts(defaults);
      setPieChartData(defaults);
    } finally {
      setLoading(false);
    }
  };

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

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

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
    <div className="merchant-products-page">
      <div className="merchant-header">
        <h2>Analytics</h2>
      </div>

      {error && <div className="alert alert-warning">{error}</div>}

      <div className="analytics-cards-container">
        <div className="analytics-card">
          <h3>Total Sales</h3>
          <p>₹{totalSales.toLocaleString()}</p>
        </div>

        <div className="analytics-card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div className="analytics-card">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>

        
      </div>

      <div className="merchant-card products-card">
        <p className="section-title">Top 5 Products Sales Distribution</p>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <PieChart data={pieChartData} />

            <div style={{ marginTop: "20px" }}>
              {pieChartData.map((product, i) => {
                const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
                const totalSales = pieChartData.reduce((sum, item) => sum + (item.sales || 0), 0);
                const percentage = totalSales > 0 ? ((product.sales / totalSales) * 100).toFixed(1) : 0;

                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "10px", fontSize: "14px" }}>
                    <div style={{ width: "16px", height: "16px", backgroundColor: colors[i], borderRadius: "3px", marginRight: "10px" }}></div>
                    <span style={{ flex: 1 }}>{product.name}</span>
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Analytics;
