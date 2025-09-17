import React, { useState } from "react";
import axios from "axios";
import "./OrderTracking.css";

function AdminOrderTracking({ orderId }) {
  const [tracking, setTracking] = useState([]);
  const [form, setForm] = useState({ status: "", statusMessage: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch tracking info
  React.useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    setError("");
    axios.get(`http://localhost:5000/api/admin/orders/order/${orderId}/tracking`)
      .then(res => setTracking(res.data))
      .catch(err => {
        setTracking([]);
        setError("Failed to fetch tracking info");
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  // Add tracking step
  const handleAddTracking = async () => {
    if (!form.status || !form.statusMessage) {
      alert("Status and message required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post(`http://localhost:5000/api/admin/orders/order/${orderId}/tracking`, form);
      setForm({ status: "", statusMessage: "", location: "" });
      const res = await axios.get(`http://localhost:5000/api/admin/orders/order/${orderId}/tracking`);
      setTracking(res.data);
    } catch (err) {
      setError("Failed to add tracking step");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="order-tracking-container">
      <h3>Order Tracking (Order #{orderId})</h3>
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ul>
        {tracking.map(step => (
          <li key={step.TrackingID}>
            <b>{step.Status}</b> - {step.StatusMessage} <br />
            {step.Location && <span>📍 {step.Location}</span>} <br />
            <small>{new Date(step.UpdatedAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
      <h4>Add Tracking Step</h4>
      <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
        <option value="">Select Status</option>
        <option value="Order Placed">Order Placed</option>
        <option value="Payment Confirmed">Payment Confirmed</option>
        <option value="Processing">Processing</option>
        <option value="Shipped">Shipped</option>
        <option value="Out for Delivery">Out for Delivery</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <input
        type="text"
        placeholder="Status Message"
        value={form.statusMessage}
        onChange={e => setForm(f => ({ ...f, statusMessage: e.target.value }))}
      />
      <input
        type="text"
        placeholder="Location"
        value={form.location}
        onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
      />
      <button onClick={handleAddTracking} disabled={loading}>Add Tracking Step</button>
    </div>
  );
}

export default AdminOrderTracking;