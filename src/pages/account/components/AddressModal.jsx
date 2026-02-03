import React, { useEffect, useState } from "react";
import AddAddressForm from "./AddAddressForm";
import axios from "../../../shared/api/axios";

function AddressModal({ userId: initialUserId }) {
  const [showModal, setShowModal] = useState(false);
  const [addressesDoc, setAddressesDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  // determine userId from prop, localStorage, or axios default header
  const storedUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
  const inferredUserId = initialUserId || storedUser?.id || axios.defaults.headers?.['X-User-Id'] || axios.defaults.headers?.common?.['X-User-Id'] || "";
  const [userId] = useState(inferredUserId);

  useEffect(() => {
    if (userId) fetchAddresses(userId);
  }, []); // run once on mount

  const fetchAddresses = async (uid) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/addresses/${uid}`);
      setAddressesDoc(res.data);
    } catch (err) {
      console.error(err);
      setAddressesDoc(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (address) => {
    if (!userId) {
      alert("No signed-in user detected. Please log in.");
      return;
    }
    try {
      const res = await axios.post(`/api/addresses`, { userId, address });
      setAddressesDoc(res.data);
    } catch (err) {
      console.error(err);
      const message = err?.response?.data?.message || err.message || 'Error saving address';
      alert(message);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <label>Signed-in User</label>
        <div className="form-control">{userId || 'No user detected (not signed in)'}</div>
      </div>

      <div className="mb-3 d-flex gap-2">
        <button className="btn btn-success" onClick={() => {
          if (!userId) return alert('No signed-in user id available');
          setShowModal(true);
        }}>
          Add Address
        </button>
      </div>

      {loading && <div>Loading...</div>}

      {addressesDoc && (
        <div className="card p-3 mb-3">
          <h5>Addresses ({addressesDoc.addresses.length})</h5>
          <ul className="list-group list-group-flush">
            {addressesDoc.addresses.map((a, idx) => (
              <li key={idx} className="list-group-item">
                <div><strong>{a.label}</strong> - {a.houseAndFloor}</div>
                <div className="text-muted">{a.buildingBlock} {a.landmark}</div>
                <div>{a.receiverName} • {a.receiverPhone}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showModal && (
        <AddAddressForm
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default AddressModal;
