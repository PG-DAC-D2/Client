import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { processPayment } from '../services/apiService';
import Navbar from '../shared/common/navbar/Navbar';
import './PaymentPage.css';

function PaymentPage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      setAlertType('danger');
      setAlertMessage('Please enter a valid amount.');
      return;
    }

    setLoading(true);
    setAlertMessage('');

    try {
      const orderId = Math.floor(Math.random() * 9000) + 1000; // Random 4-digit number

      // prefer phone fields commonly used in user object
      const phoneNumber = user?.phone || user?.phoneNumber || user?.mobile || '';

      if (!phoneNumber || phoneNumber.length !== 10) {
        setAlertType('danger');
        setAlertMessage('Your profile does not contain a valid 10-digit phone number. Please update your account details.');
        setLoading(false);
        return;
      }

      const paymentData = {
        orderId: orderId, // send numeric orderId
        userName: user?.name || '',
        userEmail: user?.email || '',
        phoneNumber: phoneNumber,
        amount: parseFloat(amount),
        currency: 'INR',
        paymentMethod: paymentMethod,
      };

      const response = await processPayment(paymentData);

      setAlertType('success');
      setAlertMessage(
        `Payment successful! Order ID: ${orderId}. Amount: ₹${amount}`
      );
      setAmount('');
      setPaymentMethod('UPI');
    } catch (error) {
      setAlertType('danger');
      setAlertMessage(
        `Payment failed: ${error?.message || 'Please try again.'}`
      );
    } finally {
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

            <form onSubmit={handleSubmit}>
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

              {/* Amount Field */}
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount (INR) <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Payment Method Dropdown */}
              <div className="mb-4">
                <label htmlFor="paymentMethod" className="form-label">
                  Payment Method <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="NetBanking">Net Banking</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-success btn-lg"
                  disabled={loading}
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
                      <i className="fas fa-credit-card me-2"></i>Pay Now
                    </>
                  )}
                </button>
              </div>

              <p className="text-muted text-center mt-3 small">
                <i className="fas fa-shield-alt me-1"></i>Your payment is secure
                and encrypted.
              </p>
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default PaymentPage;
