import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Admin.css";
import { getProducts, deleteProduct } from "../../../../services/apiService";

function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res);
      setError("");
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="merchant-products-page">
      <div className="merchant-header">
        <h2>Products</h2>
      </div>

      {error && <div className="alert alert-warning">{error}</div>}

      <div className="merchant-card products-card">
        <table className="table-modern">
          <thead>
            <tr>
              <th>Product</th>
              <th>Sales</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Merchant</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan={6}>Loading...</td></tr>
            ) : (
              products.map((item) => (
                <tr key={item._id} className="table-row">
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <img src={item.imageUrl?.[0] || "https://via.placeholder.com/80"} alt={item.name} style={{ width: "45px", height: "45px", borderRadius: "8px", objectFit: "cover" }} />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>{item.review || 0}</td>
                  <td>₹{item.rate}</td>
                  <td>{item.stockQuantity || "-"}</td>
                  <td>{item.merchantId || "-"}</td>
                  <td className="text-end">
                    <button className="table-action-btn delete-action" onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;
