import React from "react";

function PersonalInfo() {
  return (
    <div className="section-card">

      {/* Title */}
      <h4 className="fw-bold mb-4">Personal Information</h4>

      {/* PROFILE IMAGE */}
      <div className="d-flex align-items-center mb-4">
        <img
          src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80"
          alt="User"
          style={{
            width: "85px",
            height: "85px",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            marginRight: "18px",
          }}
        />

        <div>
          <p className="mb-1 fw-semibold" style={{ fontSize: "15px" }}>John Doe</p>
          <button
            className="btn btn-outline-dark btn-sm"
            style={{ borderRadius: "6px" }}
          >
            Change Photo
          </button>
        </div>
      </div>

      {/* FORM FIELDS */}
      <div className="row">

        {/* Name */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Full Name</label>
          <input className="form-control" placeholder="Enter your name" />
        </div>

        {/* Email */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" placeholder="Enter your email" />
        </div>

        {/* Phone */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Phone</label>
          <input className="form-control" placeholder="Enter phone number" />
        </div>

        {/* Address */}
        <div className="col-12 mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Enter your address"
          ></textarea>
        </div>

        {/* BUTTON */}
        <div className="col-12 text-end">
          <button className="btn-save">Save Changes</button>
        </div>

      </div>
    </div>
  );
}

export default PersonalInfo;
