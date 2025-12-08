import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Admin.css";

/**
 * Add Product Page
 * Allows merchants to create a new product entry.
 */
function AddProduct() {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    name: "",
    price: "",
    sales: "",
    image: "",
  });

  // Handle input updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit new product
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("New Product Added:", form);

    // TODO: replace with API call
    // axios.post("/api/merchant/products", form)

    // Redirect back to product list
    navigate("/merchant/products");
  };

  return (
    <div className="merchant-addproduct-page">
      {/* PAGE HEADER */}
      <div className="merchant-header">
        <h2>Add Product</h2>
      </div>

      {/* FORM CARD */}
      <div className="merchant-card add-product-card">
        <h3>Add New Product</h3>

        <form className="add-form" onSubmit={handleSubmit}>
          {/* PRODUCT NAME */}
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter product name"
            value={form.name}
            onChange={handleChange}
            required
          />

          {/* PRICE */}
          <label htmlFor="price">Price (₹)</label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
          />

          {/* INITIAL SALES */}
          <label htmlFor="sales">Initial Sales Count</label>
          <input
            id="sales"
            name="sales"
            type="number"
            placeholder="Enter initial sales count"
            value={form.sales}
            onChange={handleChange}
            min="0"
          />

          {/* IMAGE URL */}
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            name="image"
            type="text"
            placeholder="https://example.com/image.jpg"
            value={form.image}
            onChange={handleChange}
          />

          {/* SUBMIT BUTTON */}
          <button type="submit" className="btn-primary">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
