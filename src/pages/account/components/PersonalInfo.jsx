import React from "react";

function PersonalInfo() {
  return (
    <div className="section-card">

      {/* Title */}
      <h4 className="fw-bold mb-4">Personal Information</h4>
 

     

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

        {/* Date of Birth */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            placeholder="Enter date of birth"
          />
        </div>

        {/* Store Name */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Store Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter store name"
          />
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
