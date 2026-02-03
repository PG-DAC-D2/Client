import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProducts, deleteProduct } from "../../../../services/apiService";
import "../../Merchant.css";

function MerchantProducts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  // Fetch products on component mount and when returning from add product page
  useEffect(() => {
    fetchProducts();
  }, [location]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      
      // Transform API response to match table format
      const transformedProducts = response.map((product, index) => ({
        _id: product._id,
        id: product._id || `P-${index + 1}`,
        name: product.name,
        sales: product.review || 0,
        price: product.rate || 0,
        earning: (product.rate || 0) * (product.review || 0),
        image: product.imageUrl?.[0] || "https://via.placeholder.com/100",
      }));

      setProducts(transformedProducts);
      setError("");
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (productId) => {
    navigate(`/merchant/products/edit/${productId}`);
  };

  // Handle delete button click
  const handleDelete = async (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      setDeleting(productId);
      try {
        await deleteProduct(productId);
        // Remove product from state
        setProducts(products.filter(p => p._id !== productId));
        alert("Product deleted successfully");
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Failed to delete product. Please try again.");
      } finally {
        setDeleting(null);
      }
    }
  };

  return (
    <div className="merchant-products-page">

      {/* Header */}
      <div className="merchant-header">
        <h2>Products</h2>

        <button
          className="btn-primary"
          onClick={() => navigate("/merchant/products/add")}
        >
          + Add Product
        </button>
      </div>

      {error && (
        <div className="alert alert-warning" style={{ marginBottom: "20px" }}>
          {error}
        </div>
      )}

      {/* Product Table */}
      <div className="merchant-card products-card">

        {loading ? (
          <p style={{ textAlign: "center", padding: "20px" }}>Loading products...</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: "center", padding: "20px" }}>
            No products yet. <span onClick={() => navigate("/merchant/products/add")} style={{ cursor: "pointer", color: "blue" }}>Add your first product</span>
          </p>
        ) : (
          <table className="table-modern">
            <thead>
              <tr>
                <th>Product</th>
                <th>Sales</th>
                <th>Price</th>
                <th>Earnings</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="table-row">

                  {/* NAME + IMAGE */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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

                  {/* ACTION BUTTONS */}
                  <td className="text-end">
                    <button 
                      className="table-action-btn edit-action"
                      onClick={() => handleEdit(item._id)}
                      title="Edit product"
                    >
                      Edit
                    </button>
                    <button 
                      className="table-action-btn delete-action"
                      onClick={() => handleDelete(item._id, item.name)}
                      disabled={deleting === item._id}
                      title="Delete product"
                    >
                      {deleting === item._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}

export default MerchantProducts;
