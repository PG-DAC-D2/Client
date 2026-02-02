import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../../../shared/api/axios";
import "./MerchantPersonalInfo.css";

function MerchantPersonalInfo() {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    merchantId: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    storeName: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch merchant data on component mount
  useEffect(() => {
    if (user?.id) {
      fetchMerchantData();
    }
  }, [user?.id]);

  const fetchMerchantData = async () => {
    try {
      setLoading(true);
      console.log("Fetching merchant data for user ID:", user.id);
      const response = await axios.get(`/api/merchants/${user.id}`);
      console.log("Merchant data fetched:", response.data);
      
      // Format date properly for input field
      const merchantData = {
        ...response.data,
        dob: response.data.dob ? formatDateForInput(response.data.dob) : "",
      };
      
      setFormData(merchantData);
      setError("");
    } catch (err) {
      console.error("Failed to fetch merchant data:", err);
      setError("Failed to load merchant data: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const formatDateForInput = (dateStr) => {
    // Convert date to YYYY-MM-DD format for input type="date"
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage("");
      setError("");

      // Prepare data for submission
      const submitData = {
        ...formData,
        // Ensure merchantId is explicitly set
        merchantId: formData.merchantId || user.id,
      };

      console.log("Submitting merchant data:", submitData);
      const response = await axios.put("/api/merchants/update", submitData);
      console.log("Merchant updated successfully:", response.data);
      
      // Format date in response for display
      const updatedData = {
        ...response.data,
        dob: formatDateForInput(response.data.dob),
      };
      
      // Update form with the response data
      setFormData(updatedData);
      
      // Track last update time
      setLastUpdated(new Date());
      
      // Show success message
      setMessage("✓ Personal information updated successfully!");
      
      // Keep message visible for 5 seconds
      setTimeout(() => {
        setMessage("");
      }, 5000);
      
      // Optionally refresh data from server to confirm
      setTimeout(() => {
        console.log("Refreshing merchant data to confirm update...");
        fetchMerchantData();
      }, 1000);
      
    } catch (err) {
      console.error("Failed to update merchant data:", err);
      const errorMsg = err.response?.data?.message || err.message || "Failed to update personal information";
      setError("✗ Error: " + errorMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading merchant information...</div>;
  }

  return (
    <div className="merchant-personal-info">
      <div className="info-header">
        <h4>Personal Information</h4>
        <p>Update your personal details and store information</p>
        {lastUpdated && (
          <p className="last-updated">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        )}
      </div>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="info-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname || ""}
              onChange={handleChange}
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname || ""}
              onChange={handleChange}
              placeholder="Enter last name"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob || ""}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="storeName">Store Name</label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              value={formData.storeName || ""}
              onChange={handleChange}
              placeholder="Enter store name"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Enter address"
              rows="4"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-save"
            disabled={saving}
          >
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={fetchMerchantData}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default MerchantPersonalInfo;
