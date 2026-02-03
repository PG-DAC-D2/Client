import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { notificationAPI } from '../services/apiService';
import Navbar from '../shared/common/navbar/Navbar';
import './NotificationHistory.css';

function NotificationHistory() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated || !user?.email) {
      setError('User email not found.');
      setLoading(false);
      return;
    }

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError('');
        console.log(`Fetching notifications for: ${user.email}`);
        const res = await notificationAPI.getByEmail(user.email);
        console.log('Notifications received:', res.data);
        setNotifications(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError(
          `Failed to load notifications: ${err?.message || 'Please try again later.'}`
        );
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user?.email, isAuthenticated]);

  const getStatusBadge = (status) => {
    if (status === 'SENT') {
      return <span className="badge bg-success">✓ SENT</span>;
    } else if (status === 'FAILED') {
      return <span className="badge bg-danger">✗ FAILED</span>;
    } else if (status === 'PENDING') {
      return <span className="badge bg-warning">⏳ PENDING</span>;
    } else {
      return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (!isAuthenticated || !user) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 pt-5">
          <div className="alert alert-warning" role="alert">
            <i className="fas fa-lock me-2"></i>Please log in to view your notifications.
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
      <div className="notifications-container">
      <div className="notifications-card">
        <div className="card shadow">
          <div className="card-header bg-info text-white">
            <h3 className="mb-0">
              <i className="fas fa-bell me-2"></i>Notification History
            </h3>
          </div>

          <div className="card-body">
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="fas fa-exclamation-circle me-2"></i>
                {error}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError('')}
                ></button>
              </div>
            )}

            {loading ? (
              <div className="text-center">
                <div
                  className="spinner-border text-primary"
                  role="status"
                  style={{ width: '3rem', height: '3rem' }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="alert alert-info text-center" role="alert">
                <i className="fas fa-inbox me-2"></i>No notifications found. Check back after placing an order.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-striped">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">
                        <i className="fas fa-calendar me-2"></i>Date
                      </th>
                      <th scope="col">
                        <i className="fas fa-hashtag me-2"></i>Order ID
                      </th>
                      <th scope="col">
                        <i className="fas fa-message me-2"></i>Message
                      </th>
                      <th scope="col">
                        <i className="fas fa-phone me-2"></i>Recipient
                      </th>
                      <th scope="col">
                        <i className="fas fa-flag me-2"></i>Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.map((notification, index) => (
                      <tr key={index}>
                        <td>{formatDate(notification.createdDate || notification.timestamp)}</td>
                        <td>
                          <span className="badge bg-light text-dark">
                            {notification.orderId || 'N/A'}
                          </span>
                        </td>
                        <td>{notification.message || notification.content || 'N/A'}</td>
                        <td>
                          {notification.phoneNumber && (
                            <span className="badge bg-primary">{notification.phoneNumber}</span>
                          )}
                          {notification.recipient && !notification.phoneNumber && (
                            <span className="badge bg-secondary">{notification.recipient}</span>
                          )}
                          {!notification.phoneNumber && !notification.recipient && 'N/A'}
                        </td>
                        <td>{getStatusBadge(notification.status || 'SENT')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default NotificationHistory;
