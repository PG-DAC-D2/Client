import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Admin.css";

function AdminProducts() {
  const navigate = useNavigate();

  // Updated products with dummy images
  const products = [
    {
      id: "P-101",
      name: "Blue T-Shirt",
      sales: 120,
      price: 599,
      earning: 71900,
      reviews: 1202,
      reports: 2,
      image:
        "https://images.unsplash.com/photo-1740711152088-88a009e877bb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
    },

    {
      id: "P-205",
      name: "Sneakers",
      sales: 95,
      price: 2499,
      earning: 237405,
      reviews: 502,
      reports: 5,
      image:
        "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "P-311",
      name: "Denim Jeans",
      sales: 80,
      price: 1299,
      earning: 103920,
      reviews: 11992,
      reports: 23,
      image:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="merchant-products-page">
      {/* Header */}
      <div className="merchant-header">
        <h2>Products</h2>
      </div>

      {/* Product Table */}
      <div className="merchant-card products-card">
        <table className="table-modern">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Sales</th>
              <th>Price</th>
              <th>Earnings</th>
              <th>Reviews</th>
              <th>Reports</th>

              <th className="text-end">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="table-row">
                <td>{item.id}</td>

                {/* NAME + IMAGE */}
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                    <span>{item.name}</span>
                  </div>
                </td>

                <td>{item.sales}</td>
                <td>₹{item.price}</td>
                <td>₹{item.earning.toLocaleString()}</td>
                <td>{item.reviews}</td>
                <td>{item.reports}</td>

                {/* ACTION BUTTONS */}
                <td className="text-end">
                  {/* <button className="table-action-btn edit-action">Edit</button> */}
                  <button className="table-action-btn delete-action">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;
