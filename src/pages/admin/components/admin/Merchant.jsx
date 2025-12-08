import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Admin.css";

function Merchant() {
  // const navigate = useNavigate();

  // Updated merchants with dummy images
  const merchants = [
    {
      id: "M-101",
      firstname: "Rohit",
      lastName: "Patil",
      email: "rohit@gmail.com",
      sales: 1002,
      earnings: 1222332,
    },
    {
      id: "M-102",
      firstname: "Ajay",
      lastName: "Sharma",
      email: "ajay@gmail.com",
      sales: 342,
      earnings: 422332,
    },
    {
      id: "M-103",
      firstname: "Karan",
      lastName: "Patel",
      email: "karan@gmail.com",
      sales: 4421,
      earnings: 4222332,
    },
    {
      id: "M-104",
      firstname: "Sneha",
      lastName: "Verma",
      email: "sneha@gmail.com",
      sales: 882,
      earnings: 932332,
    },
  ];

  return (
    <div className="merchant-products-page">
      {/* Header */}
      <div className="merchant-header">
        <h2>Merchants</h2>
      </div>

      {/* Product Table */}
      <div className="merchant-card products-card">
        <table className="table-modern">
          <thead>
            <tr>
              <th>ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Sales</th>
              <th>Earnings</th>
            </tr>
          </thead>

          <tbody>
            {merchants.map((item) => (
              <tr key={item.id} className="table-row">
                <td>{item.id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.sales}</td>
                <td>₹{item.earnings.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Merchant;
