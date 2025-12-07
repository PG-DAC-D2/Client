import React from "react";

function Address() {
  const addresses = [
    {
      id: 1,
      label: "Home",
      address: "123 Main Street, Mumbai, India",
      phone: "+91 9876543210",
    },
    {
      id: 2,
      label: "Office",
      address: "4th Floor, Business Park, Pune, Maharashtra",
      phone: "+91 9087654321",
    },
  ];

  return (
    <div className="section-card">

      {/* Title */}
      <h4 className="fw-bold mb-4">Address Book</h4>

      {addresses.map((item) => (
        <div key={item.id} className="address-card-item mb-3 p-3" 
             style={{
               background: "#fafafa",
               borderRadius: "14px",
               border: "1px solid #e0e0e0",
               boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
             }}
        >
          <h6 className="fw-bold mb-1">{item.label}</h6>

          <p className="mb-1" style={{ fontSize: "15px", color: "#555" }}>
            {item.address}
          </p>

          <p className="text-muted mb-2" style={{ fontSize: "14px" }}>
            📞 {item.phone}
          </p>

          <div>
            <button className="btn btn-outline-secondary btn-sm me-2">
              Edit
            </button>
            <button className="btn btn-outline-danger btn-sm">
              Remove
            </button>
          </div>
        </div>
      ))}

      <button className="btn btn-success btn-sm px-3 mt-3">
        Add New Address
      </button>
    </div>
  );
}

export default Address;
