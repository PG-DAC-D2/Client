import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../../../services/apiService";
import "../../Merchant.css";

/**
 * Edit Product Page
 * Allows merchants to edit an existing product entry.
 */
function EditProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [form, setForm] = useState({
    name: "",
    rate: "",
    description: "",
    stockQuantity: "",
    imageUrl: "",
    review: "",
  });

  // Fetch product data on mount
  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const product = await getProductById(productId);
      
      setForm({
        name: product.name || "",
        rate: product.rate || "",
        description: product.description || "",
        stockQuantity: product.stockQuantity || "",
        imageUrl: product.imageUrl?.[0] || "",
        review: product.review || "",
      });
      setError("");
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  // Handle input updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Prepare product data according to the schema
      const productData = {
        name: form.name,
        rate: parseFloat(form.rate),
        description: form.description || "",
        stockQuantity: parseInt(form.stockQuantity) || 0,
        imageUrl: form.imageUrl ? [form.imageUrl] : [],
        review: parseInt(form.review) || 0,
      };

      // Call API to update product
      await updateProduct(productId, productData);
      console.log("Product updated successfully");

      // Navigate back to products
      navigate("/merchant/products", { state: { refresh: true } });
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err.message || "Failed to update product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="merchant-addproduct-page">
        <div className="merchant-header">
          <h2>Edit Product</h2>
        </div>
        <div className="merchant-card add-product-card">
          <p style={{ textAlign: "center", padding: "20px" }}>Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="merchant-addproduct-page">

      {/* PAGE HEADER */}
      <div className="merchant-header">
        <h2>Edit Product</h2>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="alert alert-danger" style={{ marginBottom: "20px" }}>
          {error}
        </div>
      )}

      {/* FORM CARD */}
      <div className="merchant-card add-product-card">

        <h3>Update Product</h3>

        <form className="add-form" onSubmit={handleSubmit}>

          {/* PRODUCT NAME */}
          <label htmlFor="name">Product Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter product name"
            value={form.name}
            onChange={handleChange}
            required
          />

          {/* PRICE/RATE */}
          <label htmlFor="rate">Price (₹) *</label>
          <input
            id="rate"
            name="rate"
            type="number"
            placeholder="Enter price"
            value={form.rate}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />

          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity">Stock Quantity</label>
          <input
            id="stockQuantity"
            name="stockQuantity"
            type="number"
            placeholder="Enter stock quantity"
            value={form.stockQuantity}
            onChange={handleChange}
            min="0"
          />

          {/* SALES COUNT */}
          <label htmlFor="review">Sales Count</label>
          <input
            id="review"
            name="review"
            type="number"
            placeholder="Enter sales count"
            value={form.review}
            onChange={handleChange}
            min="0"
          />

          {/* DESCRIPTION */}
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            value={form.description}
            onChange={handleChange}
            rows="4"
          />

          {/* IMAGE URL */}
          <label htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            placeholder="https://example.com/image.jpg"
            value={form.imageUrl}
            onChange={handleChange}
          />

          {/* BUTTON GROUP */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Updating Product..." : "Update Product"}
            </button>
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => navigate("/merchant/products")}
              style={{ padding: "10px 20px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditProduct;
