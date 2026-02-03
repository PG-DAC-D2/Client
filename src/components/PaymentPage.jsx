import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { paymentAPI } from '../services/apiService';
import Navbar from '../shared/common/navbar/Navbar';
import './PaymentPage.css';

function PaymentPage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { state } = useLocation();
  
  // ✅ orderId & amount come from Checkout (not user input or random)
  const orderId = state?.orderId;
  const amount = state?.amount;
  const paymentMethod = state?.paymentMethod || 'RAZORPAY';
  
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  
  // Verify orderId & amount exist, redirect if missing
  useEffect(() => {
    if (!orderId || !amount) {
      setAlertType('warning');
      setAlertMessage('Missing order details. Redirecting to checkout...');
      const timer = setTimeout(() => navigate('/checkout'), 2000);
      return () => clearTimeout(timer);
    }
  }, [orderId, amount, navigate]);

  // Load Razorpay SDK
  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // Handle payment with Razorpay
  const handlePayment = async () => {
    setLoading(true);
    setAlertMessage('');

    try {
      const phoneNumber = user?.phone || user?.phoneNumber || user?.mobile || '';

      if (!phoneNumber || phoneNumber.length !== 10) {
        setAlertType('danger');
        setAlertMessage('Your profile does not contain a valid 10-digit phone number. Please update your account details.');
        setLoading(false);
        return;
      }

      // 1️⃣ Load Razorpay SDK
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error('Razorpay SDK failed to load');

      // 2️⃣ Create Razorpay Order
      const { data } = await paymentAPI.createRazorpayOrder({
        orderId,
        amount,
        currency: 'INR',
        userEmail: user?.email,
        phoneNumber,
      });

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: 'INR',
        name: 'VANILO Store',
        description: `Order #${orderId}`,
        order_id: data.orderId,

        handler: async (response) => {
          try {
            // 3️⃣ Verify payment signature
            const verifyRes = await paymentAPI.verifyRazorpayPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            if (verifyRes.data.status !== 'SUCCESS') {
              throw new Error('Payment verification failed');
            }

            // 4️⃣ Process payment (triggers Kafka → Notification)
            await paymentAPI.processPayment({
              orderId,
              amount,
              currency: 'INR',
              paymentMethod: 'RAZORPAY',
              userEmail: user?.email,
              userName: user?.name,
              phoneNumber,
            });

            // 5️⃣ Success - redirect to dashboard
            setAlertType('success');
            setAlertMessage(`Payment successful! Redirecting to orders...`);
            setTimeout(() => {
              navigate('/account', { state: { activeTab: 'orders' } });
            }, 1500);
          } catch (err) {
            console.error('Payment processing error:', err);
            setAlertType('danger');
            setAlertMessage(err.message || 'Payment processing failed. Please contact support.');
            setLoading(false);
          }
        },

        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: phoneNumber,
        },

        theme: { color: '#667eea' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Razorpay error:', error);
      setAlertType('danger');
      setAlertMessage(error?.message || 'Payment initialization failed. Please try again.');
      setLoading(false);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <div className="alert alert-warning" role="alert">
            <i className="fas fa-lock me-2"></i>Please log in to proceed with payment.
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="payment-container">
      <div className="payment-card">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">
              <i className="fas fa-lock me-2"></i>Secure Payment
            </h3>
          </div>

          <div className="card-body">
            {alertMessage && (
              <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                {alertMessage}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setAlertMessage('')}
                ></button>
              </div>
            )}

            <div>
              {/* Name Field (Read-only) */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <i className="fas fa-user me-2"></i>Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your full name"
                  value={user?.name || user?.username || 'User'}
                  disabled
                  style={{
                    backgroundColor: '#e9ecef',
                    cursor: 'not-allowed',
                  }}
                />
              </div>

              {/* Email Field (Read-only) */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <i className="fas fa-envelope me-2"></i>Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="your.email@example.com"
                  value={user?.email || 'Not provided'}
                  disabled
                  style={{
                    backgroundColor: '#e9ecef',
                    cursor: 'not-allowed',
                  }}
                />
              </div>

              {/* Order ID Field (Read-only) */}
              <div className="mb-3">
                <label htmlFor="orderId" className="form-label">
                  <i className="fas fa-receipt me-2"></i>Order ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="orderId"
                  value={orderId || ''}
                  disabled
                  style={{
                    backgroundColor: '#e9ecef',
                    cursor: 'not-allowed',
                  }}
                />
              </div>

              {/* Amount Field (Read-only from Order) */}
              <div className="mb-4">
                <label htmlFor="amount" className="form-label">
                  Amount (INR)
                </label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input
                    type="text"
                    className="form-control"
                    id="amount"
                    value={(amount || 0).toFixed(2)}
                    disabled
                    style={{
                      backgroundColor: '#e9ecef',
                      cursor: 'not-allowed',
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                    }}
                  />
                </div>
              </div>

              {/* Payment Button */}
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-success btn-lg"
                  onClick={handlePayment}
                  disabled={loading || !orderId || !amount}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-credit-card me-2"></i>Pay with Razorpay
                    </>
                  )}
                </button>
              </div>

              <p className="text-muted text-center mt-3 small">
                <i className="fas fa-shield-alt me-1"></i>Your payment is secure
                and encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default PaymentPage;
