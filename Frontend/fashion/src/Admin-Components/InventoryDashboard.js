import React, { useEffect, useState } from "react";
import axios from "axios";
import "./InventoryDashboard.css";

const InventoryDashboard = () => {
  const [lowStock, setLowStock] = useState([]);
  const [categoryStock, setCategoryStock] = useState([]);
  const [recentRestocks, setRecentRestocks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/inventory/low-stock").then(r => setLowStock(r.data));
    axios.get("http://localhost:5000/api/inventory/category-stock").then(r => setCategoryStock(r.data));
    axios.get("http://localhost:5000/api/inventory/recent-restocks").then(r => setRecentRestocks(r.data));
  }, []);

  return (
    <div className="inv-wrap">
      <h2 className="page-title">Inventory Status</h2>

      {/* Low Stock + Category side-by-side (like screenshot) */}
      <div className="section">
        <h3 className="section-title">Low Stock Alerts</h3>
        <div className="cards-row">
          <div className="card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map((row, i) => (
                  <tr key={i}>
                    <td>{row.Product}</td>
                    <td>{row.Stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {categoryStock.map((row, i) => (
                  <tr key={i}>
                    <td>{row.Category}</td>
                    <td>{row.Stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Restocks */}
      <div className="section">
        <h3 className="section-title">Recent Restocks</h3>
        <div className="cards-row">
          <div className="card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Restock Date</th>
                  <th>Stock Added</th>
                </tr>
              </thead>
              <tbody>
                {recentRestocks.map((row, i) => (
                  <tr key={i}>
                    <td>{row.Product}</td>
                    <td>{new Date(row.RestockDate).toISOString().slice(0, 10)}</td>
                    <td>{row.StockAdded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* If you later need a duplicate “Recent Restocks” card like the image, add another <div className="card">…</div> here */}
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
