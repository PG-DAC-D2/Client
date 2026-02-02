import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Admin.css";
import axios from "../../../../shared/api/axios";

function Merchant() {
  const [merchants, setMerchants] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMerchants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recalculate totalPages when merchants or size changes
  useEffect(() => {
    if (merchants.length > 0) {
      const newTotalPages = Math.ceil(merchants.length / size);
      setTotalPages(newTotalPages);
    }
  }, [merchants, size]);

  const fetchMerchants = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`/api/merchants`);
      const data = res.data;

      // Backend returns an array directly
      if (Array.isArray(data)) {
        setMerchants(data);
      } else {
        setMerchants([]);
      }
    } catch (err) {
      setError("Failed to load merchants");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resolveId = (m) => m.id ?? m.merchantId ?? m.userId ?? m.backendId;

  const handleBlock = async (merchant) => {
    const id = resolveId(merchant);

    try {
      if (merchant.status === 'BLOCKED') {
        await axios.put(`/api/merchants/restore/${id}`);
        await fetchMerchants();
        alert(`Merchant ${merchant.firstname} ${merchant.lastname} unblocked successfully.`);
      } else {
        await axios.put(`/api/merchants/soft-delete/${id}`);
        await fetchMerchants();
        alert(`Merchant ${merchant.firstname} ${merchant.lastname} blocked successfully.`);
      }
    } catch (err) {
      console.error("Failed to change merchant status:", err);
      setError(err?.response?.data?.message || "Failed to change merchant status");
    }
  };

  return (
    <div className="merchant-products-page">
      <div className="merchant-header">
        <h2>Merchants</h2>
      </div>

      <div className="merchant-card products-card">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <label style={{ marginRight: 8 }}>Page size:</label>
            <select value={size} onChange={(e) => { setPage(0); setSize(Number(e.target.value)); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>

          <div>
            <button className="btn btn-sm" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page <= 0 || loading}>
              Prev
            </button>
            <span style={{ margin: "0 8px" }}>Page {page + 1} of {totalPages}</span>
            <button className="btn btn-sm" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1 || loading}>
              Next
            </button>
          </div>
        </div>

        {loading && <div>Loading merchants...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}

        <table className="table-modern">
          <thead>
            <tr>
              <th>ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Sales</th>
              <th>Earnings</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {merchants
              .slice(page * size, (page + 1) * size)
              .map((item) => (
              <tr key={resolveId(item) || item.email} className={`table-row ${item.status === 'BLOCKED' ? 'blocked' : ''}`}>
                <td>{resolveId(item)}</td>
                <td>{item.firstname ?? item.firstName ?? item.name ?? "-"}</td>
                <td>{item.lastname ?? item.lastName ?? item.surname ?? "-"}</td>
                <td>{item.email ?? item.contactEmail ?? "-"}</td>
                <td>{item.sales ?? item.totalSales ?? "-"}</td>
                <td>{item.earnings ? `₹${Number(item.earnings).toLocaleString()}` : "-"}</td>
                <td>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    backgroundColor: item.status === 'BLOCKED' ? '#ff0000' : '#51cf66',
                    color: "white"
                  }}>
                    {item.status ?? "ACTIVE"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleBlock(item)}
                    style={{
                      backgroundColor: item.status === 'BLOCKED' ? '#28a745' : '#ff0000',
                      color: 'white',
                      border: 'none'
                    }}
                  >
                    {item.status === 'BLOCKED' ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
            {merchants.length === 0 && !loading && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  No merchants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Merchant;
