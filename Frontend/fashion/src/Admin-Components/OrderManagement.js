import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./OrderManagement.css";
import AdminOrderTracking from "./OrderTracking";

// CRA env variable (fallback provided)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err?.response?.data?.message || "Request failed";
    return Promise.reject(new Error(msg));
  }
);

const StatusPill = ({ status }) => {
  if (!status) return null;
  const cls = `status-pill status-${status.toLowerCase()}`;
  return <span className={cls}>{status}</span>;
};

const Modal = ({ open, onClose, children, title }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function OrderManagement() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [selected, setSelected] = useState(null);
  const [details, setDetails] = useState(null);

  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const resp = await api.get("/api/admin/orders", { params: { status, q, page, limit } });
      setRows(resp.data.data || []);
      setTotal(resp.data.total || 0);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetails = async (orderId) => {
    setError("");
    try {
      const resp = await api.get(`/api/admin/orders/${orderId}`);
      setDetails(resp.data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => { fetchList(); }, [status, q, page]);

  const pages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  const onView = async (order) => { setSelected(order); await fetchDetails(order.orderId); };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/api/admin/orders/${orderId}/status`, { status: newStatus });
      await fetchList();
      await fetchDetails(orderId);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="order-page">
      <h1>Order Management</h1>

      <div className="filters">
        <input value={q} onChange={(e) => { setPage(1); setQ(e.target.value); }} placeholder="Search by name or Order ID" />
        <select value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
          <option value="">All Statuses</option>
          <option>Pending</option>
          <option>Paid</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
        <button onClick={fetchList}>Refresh</button>
        {loading && <span className="info">Loading…</span>}
        {error && <span className="error">{error}</span>}
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.orderId}>
                <td>{r.orderId}</td>
                <td>{r.customer}</td>
                <td>{r.address || r.Address || "N/A"}</td>
                <td>{new Date(r.date).toISOString().slice(0,10)}</td>
                <td>₹{(r.totalPrice || 0).toFixed(2)}</td>
                <td><StatusPill status={r.status} /></td>
                <td><button onClick={() => onView(r)}>View</button></td>
              </tr>
            ))}
            {rows.length === 0 && !loading && <tr><td colSpan={7} className="no-data">No orders</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={page<=1} onClick={() => setPage(p => p-1)}>Prev</button>
        <span>Page {page} of {pages}</span>
        <button disabled={page>=pages} onClick={() => setPage(p => p+1)}>Next</button>
      </div>

      <Modal open={!!selected} onClose={() => { setSelected(null); setDetails(null); }} title={`Order #${selected?.orderId || ""}`}>
        {!details ? <div>Loading details…</div> : (
          <div className="details">
            <div className="details-grid">
              <div>
                <strong>Customer:</strong>
                <div>{details.order?.customer}</div>
                <div>{details.order?.email} • {details.order?.contact}</div>
              </div>
              <div>
                <strong>Order Date:</strong>
                <div>{details.order?.orderDate ? new Date(details.order.orderDate).toLocaleString() : "N/A"}</div>
              </div>
              <div>
                <strong>Address:</strong>
                <div>{details.order?.address || details.order?.Address || "N/A"}</div>
              </div>
              <div>
                <strong>Payment:</strong>
                <div>{details.payment ? `${details.payment.PaymentStatus} via ${details.payment.PaymentMethod}` : details.order?.paymentMethod}</div>
              </div>
              <div>
                <strong>Status:</strong>
                <div>
                  <StatusPill status={details.order?.status} />
                  <select value={details.order?.status || ""} onChange={(e) => updateStatus(details.order?.orderId || selected.orderId, e.target.value)}>
                    <option>Pending</option>
                    <option>Paid</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="items">
              <h4>Items</h4>
              <table>
                <thead>
                  <tr><th>Product</th><th>Variant</th><th>Qty</th><th>Price</th><th>Line Total</th></tr>
                </thead>
                <tbody>
                  {details.items?.map(it => (
                    <tr key={it.orderItemId}>
                      <td>{it.productName}</td>
                      <td>{it.size} / {it.color}</td>
                      <td>{it.quantity}</td>
                      <td>₹{it.price.toFixed(2)}</td>
                      <td>₹{it.lineTotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="totals">
              <span>Discount: ₹{(details.order?.discountAmount || 0).toFixed(2)}</span>
              <strong>Total: ₹{details.order?.totalPrice.toFixed(2)}</strong>
            </div>

            {/* 🟡 Admin Order Tracking Section */}
            <div style={{ marginTop: "2rem", borderTop: "1px solid #eee", paddingTop: "1rem" }}>
              <h4>Order Tracking</h4>
              <AdminOrderTracking orderId={selected?.orderId} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}