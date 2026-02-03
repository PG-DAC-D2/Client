import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../shared/api/axios";
import { clearCartAPI } from "../../app/slices/cartSlice";
import Navbar from "../../shared/common/navbar/Navbar";
import "../account/Account.css";

function Checkout() {
  const cartItems = useSelector((s) => s.cart.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({ name: "", line1: "", city: "", zip: "" });
  const [billing, setBilling] = useState({ name: "", line1: "", city: "", zip: "" });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [processing, setProcessing] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const total = cartItems.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);

  // infer user id
  const storedUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
  const userId = storedUser?.id || api.defaults.headers?.['X-User-Id'] || api.defaults.headers?.common?.['X-User-Id'] || null;

  useEffect(() => {
    if (userId) loadAddresses(userId);
  }, [userId]);

  const loadAddresses = async (uid) => {
    try {
      const res = await api.get(`/api/addresses/${uid}`);
      const doc = res.data;
      const list = doc?.addresses || [];
      setAddresses(list);
      // prefer Home label
      const home = list.find(a => a.label === 'Home');
      const first = home || list[0];
      if (first) {
        setSelectedAddressId(first._id || first.id);
        applyAddressToForm(first);
      }
    } catch (err) {
      console.warn('No addresses or failed to load', err);
      setAddresses([]);
    }
  };

  const applyAddressToForm = (addr) => {
    setShipping({
      name: addr.receiverName || '',
      line1: [addr.houseAndFloor, addr.buildingBlock, addr.landmark].filter(Boolean).join(', '),
      city: '',
      zip: '',
    });
    setBilling({
      name: addr.receiverName || '',
      line1: [addr.houseAndFloor, addr.buildingBlock, addr.landmark].filter(Boolean).join(', '),
      city: '',
      zip: '',
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setProcessing(true);
    try {
      const dto = {
        items: cartItems.map((i) => ({
          productId: i.id,
          productName: i.name,
          unitPrice: Number(i.price) || 0,
          quantity: Number(i.quantity) || 1,
        })),
        shippingAddressJson: JSON.stringify(shipping),
        billingAddressJson: JSON.stringify(billing),
      };

      // create order
      const res = await api.post("/api/orders", dto);
      const orderId = res.data?.orderId;

      if (!orderId) {
        throw new Error("Order id not returned");
      }

      // If not COD, simulate payment and confirm on server
      if (paymentMethod !== "COD") {
        // simulate payment gateway (replace with real integration)
        await new Promise((r) => setTimeout(r, 800));
        // call confirm payment endpoint
        await api.post(`/api/orders/${orderId}/confirm-payment`);
      }

      // clear cart
      dispatch(clearCartAPI());

      // Navigate to account orders
      navigate("/account");
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ height: 90 }} />
      <div className="account-page-bg">
        <div className="account-container">
          <h3 className="account-title">Checkout</h3>

          <div className="row g-4">
            <div className="col-md-7">
              <div className="section-card p-4">
                <h5>Shipping Address</h5>
                <form onSubmit={handlePlaceOrder}>
                  <div className="mb-3">
                    <label className="form-label">Choose saved address</label>
                    <select className="form-select" value={selectedAddressId || ''} onChange={(e) => {
                      const id = e.target.value;
                      setSelectedAddressId(id);
                      const sel = addresses.find(a => String(a._id || a.id) === String(id));
                      if (sel) applyAddressToForm(sel);
                    }}>
                      <option value="">-- Select address --</option>
                      {addresses.map(a => (
                        <option key={a._id || a.id} value={a._id || a.id}>{a.label} — {a.houseAndFloor?.slice(0,40)}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Full name</label>
                    <input className="form-control" value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address line</label>
                    <input className="form-control" value={shipping.line1} onChange={(e) => setShipping({ ...shipping, line1: e.target.value })} />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">City</label>
                      <input className="form-control" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">ZIP</label>
                      <input className="form-control" value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} />
                    </div>
                  </div>

                  {/* <h5 className="mt-4">Billing Address</h5>
                  <div className="mb-3">
                    <label className="form-label">Full name</label>
                    <input className="form-control" value={billing.name} onChange={(e) => setBilling({ ...billing, name: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address line</label>
                    <input className="form-control" value={billing.line1} onChange={(e) => setBilling({ ...billing, line1: e.target.value })} />
                  </div> */}

                  <h5 className="mt-4">Payment Method</h5>
                  <div className="mb-3">
                    <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                      <option value="COD">Cash on Delivery (COD)</option>
                      <option value="UPI">UPI (simulate)</option>
                      <option value="CARD">Card (simulate)</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div>
                      <strong>Total: </strong> ₹{total.toFixed(2)}
                    </div>
                    <div>
                      <button className="btn btn-primary" type="submit" disabled={processing}>
                        {processing ? "Placing order…" : paymentMethod === "COD" ? "Place order (COD)" : "Pay & Place order"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-5">
              <div className="section-card p-4">
                <h5>Order Items</h5>
                {cartItems.map((it) => (
                  <div key={it.cartItemId || it.id} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <img src={it.image} alt={it.name} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 6 }} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{it.name}</div>
                      <div>Qty: {it.quantity}</div>
                      <div>₹{it.price}</div>
                    </div>
                  </div>
                ))}

                <div style={{ borderTop: '1px solid #eee', paddingTop: 12, marginTop: 12 }}>
                  <div className="d-flex justify-content-between"><span>Subtotal</span><span>₹{total.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
