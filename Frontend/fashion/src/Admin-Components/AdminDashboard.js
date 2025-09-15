



import React, { useState, useEffect } from "react";
import styles from './AdminDashboard.module.css';
import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import WishlistCartViewer from "./WishlistCartViewer";
import InventoryDashboard from "./InventoryDashboard";
import OrderManagement from "./OrderManagement";
import ReportsAnalytics from "./ReportsAnalytics";
import {
  FaTachometerAlt, FaBoxOpen, FaClipboardList, FaUsers,
  FaHeart, FaChartBar, FaWarehouse, FaSignOutAlt,
  FaShoppingCart, FaDollarSign
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// ✅ API helper inside this file
const API = axios.create({
  baseURL: "http://localhost:5000/api/admin",
  withCredentials: true,
});

const getDashboardStats = () => API.get("/dashboard/stats");
const getLowStock = () => API.get("/dashboard/low-stock");
const getSalesTrends = () => API.get("/dashboard/sales-trends");

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  // Dashboard data
  const [stats, setStats] = useState({});
  const [lowStock, setLowStock] = useState([]);
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });

  // ✅ Session check
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/check", { withCredentials: true })
      .then((res) => {
        if (!res.data.loggedIn) {
          window.location.href = "/admin/login";
        } else {
          setLoading(false);
          fetchDashboardData();
        }
      })
      .catch(() => {
        window.location.href = "/admin/login";
      });
  }, []);

  // ✅ Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const [statsRes, lowStockRes, salesRes] = await Promise.all([
        getDashboardStats(),
        getLowStock(),
        getSalesTrends(),
      ]);

      setStats(statsRes.data);
      setLowStock(lowStockRes.data);
      setSalesData({
        labels: salesRes.data.labels,
        datasets: [
          {
            label: "Sales Trends",
            data: salesRes.data.data,
            borderColor: "#007bff",
            backgroundColor: "rgba(0,123,255,0.2)",
            tension: 0.4,
            fill: true,
          },
        ],
      });
    } catch (err) {
      console.error("Error fetching dashboard data", err);
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    await axios.post("http://localhost:5000/api/admin/logout", {}, { withCredentials: true });
    window.location.href = "/admin/login";
  };

  if (loading) return <p>Loading...</p>;

  const renderContent = () => {
    switch (activePage) {
      case "products": return <AdminProducts />;
      case "orders": return <OrderManagement />;
      case "users": return <AdminUsers />;
      case "wishlist": return <WishlistCartViewer />;
      case "reports": return <ReportsAnalytics />;
      case "inventory": return <InventoryDashboard />;
      default:
        return (
          <div className={styles.dashboardContent}>
            <h2>Dashboard</h2>
            {/* Stats Cards */}
            <div className={styles.statsCards}>
              <div className={styles.card}><FaUsers className={styles.cardIcon} /><div><p>Total Users</p><h3>{stats.totalUsers}</h3></div></div>
              <div className={styles.card}><FaBoxOpen className={styles.cardIcon} /><div><p>Total Products</p><h3>{stats.totalProducts}</h3></div></div>
              <div className={styles.card}><FaShoppingCart className={styles.cardIcon} /><div><p>Total Orders</p><h3>{stats.totalOrders}</h3></div></div>
              <div className={styles.card}><FaDollarSign className={styles.cardIcon} /><div><p>Revenue</p><h3>${stats.totalRevenue}</h3></div></div>
            </div>

            {/* Low Stock Table */}
            <div className={styles.tableContainer}>
              <h3>Low Stock Alerts</h3>
              <table>
                <thead>
                  <tr><th>Product</th><th>Price</th><th>Stock</th><th>Category</th></tr>
                </thead>
                <tbody>
                  {lowStock.length > 0 ? (
                    lowStock.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.Name}</td>
                        <td>${item.Price}</td>
                        <td>{item.StockQuantity}</td>
                        <td>{item.Category}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4">No low stock items 🎉</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Sales Trends */}
            <div className={styles.chartContainer}>
              <h3>Sales Trends</h3>
              <Line data={salesData} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.headerGap}></div>
      <div className={styles.dashboardContainer}>
        <aside className={styles.sidebar}>
          <ul className={styles.sidebarMenu}>
            <li onClick={() => setActivePage("dashboard")}><FaTachometerAlt className={styles.icon} /> <span>Dashboard</span></li>
            <li onClick={() => setActivePage("products")}><FaBoxOpen className={styles.icon} /> <span>Product Management</span></li>
            <li onClick={() => setActivePage("orders")}><FaClipboardList className={styles.icon} /> <span>Order Management</span></li>
            <li onClick={() => setActivePage("users")}><FaUsers className={styles.icon} /> <span>User Management</span></li>
            <li onClick={() => setActivePage("wishlist")}><FaHeart className={styles.icon} /> <span>Wishlist & Cart Viewer</span></li>
            <li onClick={() => setActivePage("reports")}><FaChartBar className={styles.icon} /> <span>Reports & Analytics</span></li>
            <li onClick={() => setActivePage("inventory")}><FaWarehouse className={styles.icon} /> <span>Inventory Management</span></li>
            <li onClick={handleLogout}><FaSignOutAlt className={styles.icon} /> <span>Logout</span></li>
          </ul>
        </aside>
        <main className={styles.mainContent}>{renderContent()}</main>
      </div>
    </div>
  );
}

export default AdminDashboard;