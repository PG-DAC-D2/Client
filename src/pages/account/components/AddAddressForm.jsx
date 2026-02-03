import React, { useState } from "react";
import "./AddAddressForm.css";

function AddAddressForm({ onClose, onSave, initialData = null, addressId = null }) {
  const [houseAndFloor, setHouseAndFloor] = useState(initialData?.houseAndFloor || "");
  const [buildingBlock, setBuildingBlock] = useState(initialData?.buildingBlock || "");
  const [landmark, setLandmark] = useState(initialData?.landmark || "");
  const [label, setLabel] = useState(initialData?.label || "Home");
  const [receiverName, setReceiverName] = useState(initialData?.receiverName || "");
  const [receiverPhone, setReceiverPhone] = useState(initialData?.receiverPhone || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const address = {
      houseAndFloor,
      buildingBlock,
      landmark,
      label,
      receiverName,
      receiverPhone,
    };
    if (onSave) onSave(address, addressId);
    if (onClose) onClose();
  };

  return (
    <div className="address-form-modal">
      <div className="address-form-card">
        <h4 className="fw-bold mb-3">Add Address Details</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>House No. & Floor *</label>
            <input
              className="form-control"
              value={houseAndFloor}
              onChange={(e) => setHouseAndFloor(e.target.value)}
              placeholder="Ashirvad gas, sus gaon, near shivna chawk"
              required
            />
          </div>
          <div className="mb-2">
            <label>Building & Block No. (Optional)</label>
            <input
              className="form-control"
              value={buildingBlock}
              onChange={(e) => setBuildingBlock(e.target.value)}
              placeholder="Call on 9284670096"
            />
          </div>
          <div className="mb-2">
            <label>Landmark & Area Name (Optional)</label>
            <input
              className="form-control"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="Near temple or bus stop of sus"
            />
          </div>
          <div className="mb-2">
            <label>Add Address Label</label>
            <div>
              <select className="form-select form-select-sm" value={label} onChange={(e) => setLabel(e.target.value)}>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="mb-2">
            <label>Receiver’s Name</label>
            <input
              className="form-control"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="Enter receiver's name"
            />
          </div>
          <div className="mb-3">
            <label>Receiver’s Phone Number</label>
            <input
              className="form-control"
              value={receiverPhone}
              onChange={(e) => setReceiverPhone(e.target.value)}
              placeholder="+91"
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Address</button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}

export default AddAddressForm;
