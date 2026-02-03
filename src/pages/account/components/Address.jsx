import React, { useEffect, useState } from "react";
import AddAddressForm from "./AddAddressForm";
import axios from "../../../shared/api/axios";
import { FiPhone } from "react-icons/fi";


function Address() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);

  // infer signed-in user id (localStorage or axios header)
  const storedUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
  const inferredUserId = storedUser?.id || axios.defaults.headers?.['X-User-Id'] || axios.defaults.headers?.common?.['X-User-Id'] || null;

  useEffect(() => {
    if (inferredUserId) fetchAddresses(inferredUserId);
  }, []);

  const fetchAddresses = async (uid) => {
    try {
      const res = await axios.get(`/api/addresses/${uid}`);
      const doc = res.data;
      setAddresses(doc?.addresses || []);
    } catch (err) {
      console.error('Failed to load addresses', err);
      setAddresses([]);
    }
  };

  const handleSaveAddress = async (address, addressId = null) => {
    if (!inferredUserId) return alert('No signed-in user detected');
    try {
      let res;
      if (addressId) {
        res = await axios.put(`/api/addresses/${inferredUserId}/${addressId}`, { address });
      } else {
        res = await axios.post('/api/addresses', { userId: inferredUserId, address });
      }
      setAddresses(res.data?.addresses || []);
    } catch (err) {
      console.error('Failed to save address', err);
      alert(err?.response?.data?.message || 'Error saving address');
    }
  };

  const handleEditClick = (addr) => {
    setEditingAddress(addr);
    setShowAddForm(true);
  };

  const handleRemove = async (addrId) => {
    if (!inferredUserId) return alert('No signed-in user detected');
    if (!window.confirm('Remove this address?')) return;
    try {
      const res = await axios.delete(`/api/addresses/${inferredUserId}/${addrId}`);
      setAddresses(res.data?.addresses || []);
    } catch (err) {
      console.error('Failed to remove address', err);
      alert(err?.response?.data?.message || 'Error removing address');
    }
  };

  return (
    <div className="section-card">

      {/* Title */}
      <h4 className="fw-bold mb-4">Address Book</h4>

      {addresses.map((item, idx) => (
        <div key={item._id || idx} className="address-card-item mb-3 p-3" 
             style={{
               background: "#fafafa",
               borderRadius: "14px",
               border: "1px solid #e0e0e0",
               boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
             }}
        >
          <h6 className="fw-bold mb-1">{item.label}</h6>

          <p className="mb-1" style={{ fontSize: "15px", color: "#555" }}>
            {item.houseAndFloor || item.address}
          </p>

          <p className="text-muted mb-2" style={{ fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
            <FiPhone size={15} /> {item.receiverPhone || item.phone}
          </p>
          <div>
            <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleEditClick(item)}>
              Edit
            </button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemove(item._id || item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="mt-3">
        <button className="btn btn-success btn-sm px-3" onClick={() => setShowAddForm(true)}>Add New Address</button>
      </div>

      {showAddForm && (
        <AddAddressForm
          onClose={() => { setShowAddForm(false); setEditingAddress(null); }}
          onSave={handleSaveAddress}
          initialData={editingAddress}
          addressId={editingAddress?._id || null}
        />
      )}
    </div>
  );
}

export default Address;
