import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import "./ReportsAnalytics.css"; // import CSS

export default function ReportsAnalytics() {
  const API = process.env.REACT_APP_API_BASE || "http://localhost:5000";

  const [filters, setFilters] = useState({ startDate: "", endDate: "", category: "" });
  const [topProducts, setTopProducts] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [ordersOverTime, setOrdersOverTime] = useState([]);

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line
  }, []);

  const fetchAll = async (useFilters = false) => {
    try {
      const params = useFilters ? filters : {};
      const [tp, tc, inv, oot] = await Promise.all([
        axios.get(`${API}/api/reports/top-products`, { params }),
        axios.get(`${API}/api/reports/top-customers`, { params: {} }),
        axios.get(`${API}/api/reports/inventory-status`),
        axios.get(`${API}/api/reports/orders-over-time`, { params }),
      ]);

      setTopProducts(tp.data);
      setTopCustomers(tc.data);
      setInventory(inv.data);
      setOrdersOverTime(oot.data);
    } catch (err) {
      console.error("Fetch reports error", err);
      alert("Failed to fetch reports (check console)");
    }
  };

  const handleApplyFilters = () => fetchAll(true);

  const exportJson = async () => {
    try {
      const res = await axios.get(`${API}/api/reports/export`, { params: filters });
      const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `snitch_reports_${Date.now()}.json`;
      a.click();
    } catch (err) {
      console.error("Export error", err);
      alert("Export failed");
    }
  };

  const chartData = {
    labels: ordersOverTime.map((r) => format(new Date(r.day), "yyyy-MM-dd")),
    datasets: [
      {
        label: "Revenue",
        data: ordersOverTime.map((r) => parseFloat(r.revenue || 0)),
        fill: false,
        borderColor: "#007bff",
        tension: 0.3,
      },
      {
        label: "Orders",
        data: ordersOverTime.map((r) => parseInt(r.orders_count || 0, 10)),
        fill: false,
        borderColor: "#28a745",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h2>Reports & Analytics</h2>
        <div>
          <button onClick={exportJson} className="btn btn-primary">Export</button>
        </div>
      </div>

      <div className="reports-layout">
        <div className="reports-sidebar">
          <div className="card">
            <h4>Filters</h4>
            <div className="filters-grid">
              <label>
                Start Date
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
              </label>
              <label>
                End Date
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </label>
              <label>
                Category
                <input
                  type="text"
                  placeholder="Category"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                />
              </label>
              <div className="filters-actions">
                <button onClick={handleApplyFilters} className="btn btn-primary">Apply</button>
                <button
                  onClick={() => {
                    setFilters({ startDate: "", endDate: "", category: "" });
                    fetchAll();
                  }}
                  className="btn btn-secondary"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <h4>Top Products</h4>
            <ol>
              {topProducts.map((p) => (
                <li key={p.PID}>
                  {p.Name} — {p.total_sold || 0} sold • ₹
                  {p.revenue ? parseFloat(p.revenue).toFixed(2) : "0.00"}
                </li>
              ))}
            </ol>
          </div>

          <div className="card">
            <h4>Top Customers</h4>
            <ol>
              {topCustomers.map((c) => (
                <li key={c.UID}>
                  {c.name || `${c.FirstName} ${c.LastName}`} — ₹
                  {c.total_spent ? parseFloat(c.total_spent).toFixed(2) : "0.00"}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="reports-main">
          <div className="card">
            <h4>Orders Over Time</h4>
            <div className="chart-container">
              <Line data={chartData} />
            </div>
          </div>

          <div className="card">
            <h4>Inventory Status (low stock first)</h4>
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((i) => (
                  <tr key={i.PID}>
                    <td>{i.Name}</td>
                    <td>{i.total_stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
