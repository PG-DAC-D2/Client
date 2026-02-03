import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserNotifications } from '../services/apiService';
import './NotificationHistory.css';

function NotificationHistory() {
  const { user } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.email) {
        setError('User email not found.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const data = await getUserNotifications(user.email);
        setNotifications(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          `Failed to load notifications: ${err?.message || 'Please try again later.'}`
        );
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user?.email]);

  const getStatusBadge = (status) => {
    if (status === 'SENT') {
      return <span className="badge bg-success">SENT</span>;
    } else if (status === 'FAILED') {
      return <span className="badge bg-danger">FAILED</span>;
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

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          Please log in to view your notifications.
        </div>
      </div>
    );
  }

  return (
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
                <i className="fas fa-inbox me-2"></i>No notifications found.
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
                        <i className="fas fa-flag me-2"></i>Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.map((notification, index) => (
                      <tr key={index}>
                        <td>{formatDate(notification.createdDate)}</td>
                        <td>
                          <span className="badge bg-light text-dark">
                            {notification.orderId || 'N/A'}
                          </span>
                        </td>
                        <td>{notification.message || 'N/A'}</td>
                        <td>{getStatusBadge(notification.status)}</td>
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
  );
}

export default NotificationHistory;
