
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrdersPage from "./OrdersPage"; // adjust path if needed
import "./ProfilePage.css";
import AddressesPage from "./AddressesPage";


function ProfilePage() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.UID) {
      navigate("/login");
      return;
    }
    axios
      .get(`http://localhost:5000/api/profile/${storedUser.UID}`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        alert("Failed to load profile");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return <p>Loading profile...</p>;

  // --- Section Content Components ---
  const OverviewSection = () => (
    <div className="profile-card">
      <h2 className="profile-title">User Details</h2>
      <div className="profile-content">
        <div className="profile-avatar">
          <img src="/default-avatar.png" alt="Profile" />
        </div>
        <div className="profile-details">
          <div className="profile-row">
            <span className="profile-label">Full Name:</span>
            <span className="profile-value">{user.FirstName} {user.LastName}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{user.Email}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Phone Number:</span>
            <span className="profile-value">{user.Contact || "N/A"}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Address:</span>
            <span className="profile-value">{user.Address || "N/A"}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Member since:</span>
            <span className="profile-value">{new Date(user.CreatedAt).toDateString()}</span>
          </div>
          <button className="edit-btn">
            <i className="fas fa-edit"></i> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );

 const OrdersSection = () => (
  // <div className="profile-card">
  <div className="orders-section">
    <h2 className="profile-title"></h2>
    <OrdersPage />
  </div>
);

// ProfilePage.js (inside OrdersSection component)


// const OrdersSection = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [tracking, setTracking] = useState([]);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (!storedUser?.UID) return;

//     axios
//       .get(`http://localhost:5000/api/orders/user/${storedUser.UID}`)
//       .then(res => setOrders(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const viewTracking = async (orderId) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
//       setSelectedOrder(res.data.order);
//       setTracking(res.data.tracking);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch order tracking.");
//     }
//   };

//   return (
//     <div>
//       <h3>Your Orders</h3>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <ul>
//           {orders.map(order => (
//             <li key={order.OrderID} style={{ marginBottom: 12, borderBottom: "1px solid #ccc", paddingBottom: 8 }}>
//               <b>Order ID:</b> {order.OrderID} | <b>Status:</b> {order.Status} | <b>Total:</b> ₹{order.TotalPrice}
//               <button onClick={() => viewTracking(order.OrderID)} style={{ marginLeft: 12 }}>View Tracking</button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {selectedOrder && (
//         <div className="tracking-section" style={{ marginTop: 20, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
//           <h4>Tracking for Order ID: {selectedOrder.OrderID}</h4>
//           <p><b>Shipped Date:</b> {selectedOrder.ShippedDate ? new Date(selectedOrder.ShippedDate).toLocaleString() : "N/A"}</p>
//           <p><b>Estimated Delivery:</b> {selectedOrder.EstimatedDeliveryDate ? new Date(selectedOrder.EstimatedDeliveryDate).toLocaleString() : "N/A"}</p>
//           <p><b>Tracking Number:</b> {selectedOrder.TrackingNumber || "N/A"}</p>
//           <p><b>Courier Service:</b> {selectedOrder.CourierService || "N/A"}</p>

//           <h5>Tracking History:</h5>
//           {tracking.length === 0 ? (
//             <p>No tracking updates yet.</p>
//           ) : (
//             <ul>
//               {tracking.map(t => (
//                 <li key={t.UpdatedAt}>
//                   <b>{t.Status}</b> - {t.StatusMessage} ({t.Location}) <i>{new Date(t.UpdatedAt).toLocaleString()}</i>
//                 </li>
//               ))}
//             </ul>
//           )}
//           <button onClick={() => setSelectedOrder(null)} style={{ marginTop: 12 }}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// };


  const AddressesSection = () => (
    <div className="profile-card">
      <h2 className="profile-title">Your Addresses</h2>
      <AddressesPage />
    </div>
  );

  

 const NotificationsSection = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const uid = storedUser?.UID;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notifications/user/${uid}`);
        setNotifications(res.data);
      } catch {
        setNotifications([]);
      }
      setLoading(false);
    };
    fetchNotifications();
  }, [uid]);

  const markAsRead = async (id) => {
    await axios.post(`http://localhost:5000/api/notifications/read/${id}`);
    setNotifications((prev) =>
      prev.map((n) => (n.NotificationID === id ? { ...n, IsRead: 1 } : n))
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case "order": return <i className="fas fa-receipt" style={{ color: "#1976d2" }} />;
      case "shipping": return <i className="fas fa-truck" style={{ color: "#ffa726" }} />;
      case "delivered": return <i className="fas fa-box-open" style={{ color: "#43a047" }} />;
      case "offer": return <i className="fas fa-tag" style={{ color: "#e53935" }} />;
      case "voucher": return <i className="fas fa-gift" style={{ color: "#8e24aa" }} />;
      default: return <i className="fas fa-bell" />;
    }
  };

  if (loading) return <div className="profile-card">Loading notifications...</div>;

  return (
    <div className="profile-card">
      <h2 className="profile-title">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifications.map((n) => (
            <li
              key={n.NotificationID}
              style={{
                background: n.IsRead ? "#f5f5f5" : "#fffbe7",
                border: "1px solid #eee",
                borderRadius: 8,
                padding: 14,
                marginBottom: 10,
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 22 }}>{getIcon(n.Type)}</span>
              <div style={{ flex: 1 }}>
                <strong>{n.Title}</strong>
                <div>{n.Message}</div>
                <div style={{ fontSize: 12, color: "#888" }}>
                  {new Date(n.CreatedAt).toLocaleString()}
                </div>
              </div>
              {!n.IsRead && (
                <button
                  style={{
                    background: "#ffa726",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "2px 8px",
                    cursor: "pointer",
                  }}
                  onClick={() => markAsRead(n.NotificationID)}
                >
                  Mark as read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
 const ChangePasswordSection = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const uid = storedUser?.UID;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/profile/change-password", {
        uid,
        oldPassword,
        newPassword,
      });
      if (res.data.success) {
        setMessage("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(res.data.error || "Failed to change password.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to change password.");
    }
  };

  return (
    <div className="profile-card">
      <h2 className="profile-title">Change Password</h2>
      <form onSubmit={handleSubmit} className="change-password-form">
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="edit-btn">Update Password</button>
        {message && <div style={{ color: "green", marginTop: 8 }}>{message}</div>}
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      </form>
    </div>
  );
};

  // --- Section Switcher ---
  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />;
      case "orders":
        return <OrdersSection />;
      case "addresses":
        return <AddressesSection />;
      
      case "notifications":
        return <NotificationsSection />;
      case "change-password":
        return <ChangePasswordSection />;
      default:
        return <OverviewSection />;
    }
  };

  
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="sidebar-menu">
          <li
            className={activeSection === "overview" ? "active" : ""}
            onClick={() => setActiveSection("overview")}
          >
            <i className="fas fa-user"></i> Overview
          </li>
          <li
            className={activeSection === "orders" ? "active" : ""}
            onClick={() => setActiveSection("orders")}
          >
            <i className="fas fa-box"></i> Orders
          </li>
          <li
            className={activeSection === "addresses" ? "active" : ""}
            onClick={() => setActiveSection("addresses")}
          >
            <i className="fas fa-map-marker-alt"></i> Addresses
          </li>
          
          <li
            className={activeSection === "notifications" ? "active" : ""}
            onClick={() => setActiveSection("notifications")}
          >
            <i className="fas fa-bell"></i> Notifications
          </li>
          <li
            className={activeSection === "change-password" ? "active" : ""}
            onClick={() => setActiveSection("change-password")}
          >
            <i className="fas fa-key"></i> Change Password
          </li>
          <li onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="profile-main">{renderSection()}</main>
    </div>
  );
}

export default ProfilePage;