



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AdminDashboard.css";
// import AdminProducts from "./AdminProducts";
// import AdminUsers from "./AdminUsers";
// import WishlistCartViewer from "./WishlistCartViewer"; 
// import InventoryDashboard from "./InventoryDashboard";
// import OrderManagement from "./OrderManagement";
// import ReportsAnalytics from "./ReportsAnalytics";
// import {
//   FaTachometerAlt,
//   FaBoxOpen,
//   FaClipboardList,
//   FaUsers,
//   FaHeart,
//   FaChartBar,
//   FaWarehouse,
//   FaSignOutAlt,
//   FaShoppingCart,
//   FaDollarSign,
// } from "react-icons/fa";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// function AdminDashboard() {
//   const [activePage, setActivePage] = useState("dashboard");
//   const [loading, setLoading] = useState(true);

//   // ✅ Check session on mount
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/admin/check", { withCredentials: true })
//       .then((res) => {
//         if (!res.data.loggedIn) {
//           window.location.href = "/admin/login"; // redirect if not logged in
//         } else {
//           setLoading(false);
//         }
//       })
//       .catch(() => {
//         window.location.href = "/admin/login";
//       });
//   }, []);

//   // ✅ Logout
//   const handleLogout = async () => {
//     await axios.post("http://localhost:5000/api/admin/logout", {}, { withCredentials: true });
//     window.location.href = "/admin/login";
//   };

//   if (loading) return <p>Loading...</p>;

//   // Sales chart data
//   const salesData = {
//     labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
//     datasets: [
//       {
//         label: "Sales Trends",
//         data: [14000, 12000, 4000, 5000, 8000, 20000, 15000, 10000, 8000, 6000, 4000, 2000],
//         borderColor: "#007bff",
//         backgroundColor: "rgba(0, 123, 255, 0.2)",
//         tension: 0.4,
//         fill: true,
//       },
//     ],
//   };

//   const renderContent = () => {
//     switch (activePage) {
//       case "products":
//         return <AdminProducts />;
//       case "orders":
//         return <OrderManagement />;
//       case "users":
//         return <AdminUsers />;
//       case "wishlist":
//         return <WishlistCartViewer />;
//       case "reports":
//         return <ReportsAnalytics />;
//       case "inventory":
//         return <InventoryDashboard />;
//       default:
//         return (
//           <div className="dashboard-content">
//             <h2>Dashboard</h2>
//             {/* cards + table + chart same as before */}
//             <div className="stats-cards">
//               <div className="card"><FaUsers className="card-icon" /><div><p>Total Users</p><h3>1,250</h3></div></div>
//               <div className="card"><FaBoxOpen className="card-icon" /><div><p>Total Products</p><h3>300</h3></div></div>
//               <div className="card"><FaShoppingCart className="card-icon" /><div><p>Total Orders</p><h3>1,234</h3></div></div>
//               <div className="card"><FaDollarSign className="card-icon" /><div><p>Revenue</p><h3>$45.67</h3></div></div>
//             </div>
//             <div className="table-container">
//               <h3>Low Stock Alerts</h3>
//               <table>
//                 <thead>
//                   <tr><th>Product</th><th>Price</th><th>Stock</th><th>Category</th></tr>
//                 </thead>
//                 <tbody>
//                   <tr><td>Product A</td><td>$25</td><td>5</td><td>Electronics</td></tr>
//                   <tr><td>Product B</td><td>$15</td><td>3</td><td>Home</td></tr>
//                   <tr><td>Product C</td><td>$30</td><td>8</td><td>Sports</td></tr>
//                   <tr><td>Product D</td><td>$20</td><td>2</td><td>Electronics</td></tr>
//                 </tbody>
//               </table>
//             </div>
//             <div className="chart-container">
//               <h3>Sales Trends</h3>
//               <Line data={salesData} />
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="dashboard-wrapper">
//       <div className="header-gap"></div>
//       <div className="dashboard-container">
//         <aside className="sidebar">
//           <ul className="sidebar-menu">
//             <li onClick={() => setActivePage("dashboard")}><FaTachometerAlt className="icon" /> <span>Dashboard</span></li>
//             <li onClick={() => setActivePage("products")}><FaBoxOpen className="icon" /> <span>Product Management</span></li>
//             <li onClick={() => setActivePage("orders")}><FaClipboardList className="icon" /> <span>Order Management</span></li>
//             <li onClick={() => setActivePage("users")}><FaUsers className="icon" /> <span>User Management</span></li>
//             <li onClick={() => setActivePage("wishlist")}><FaHeart className="icon" /> <span>Wishlist & Cart Viewer</span></li>
//             <li onClick={() => setActivePage("reports")}><FaChartBar className="icon" /> <span>Reports & Analytics</span></li>
//             <li onClick={() => setActivePage("inventory")}><FaWarehouse className="icon" /> <span>Inventory Management</span></li>
//             <li onClick={handleLogout}><FaSignOutAlt className="icon" /> <span>Logout</span></li>
//           </ul>
//         </aside>
//         <main className="main-content">{renderContent()}</main>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;



import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
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
          <div className="dashboard-content">
            <h2>Dashboard</h2>
            {/* Stats Cards */}
            <div className="stats-cards">
              <div className="card"><FaUsers className="card-icon" /><div><p>Total Users</p><h3>{stats.totalUsers}</h3></div></div>
              <div className="card"><FaBoxOpen className="card-icon" /><div><p>Total Products</p><h3>{stats.totalProducts}</h3></div></div>
              <div className="card"><FaShoppingCart className="card-icon" /><div><p>Total Orders</p><h3>{stats.totalOrders}</h3></div></div>
              <div className="card"><FaDollarSign className="card-icon" /><div><p>Revenue</p><h3>${stats.totalRevenue}</h3></div></div>
            </div>

            {/* Low Stock Table */}
            <div className="table-container">
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
            <div className="chart-container">
              <h3>Sales Trends</h3>
              <Line data={salesData} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="header-gap"></div>
      <div className="dashboard-container">
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li onClick={() => setActivePage("dashboard")}><FaTachometerAlt className="icon" /> <span>Dashboard</span></li>
            <li onClick={() => setActivePage("products")}><FaBoxOpen className="icon" /> <span>Product Management</span></li>
            <li onClick={() => setActivePage("orders")}><FaClipboardList className="icon" /> <span>Order Management</span></li>
            <li onClick={() => setActivePage("users")}><FaUsers className="icon" /> <span>User Management</span></li>
            <li onClick={() => setActivePage("wishlist")}><FaHeart className="icon" /> <span>Wishlist & Cart Viewer</span></li>
            <li onClick={() => setActivePage("reports")}><FaChartBar className="icon" /> <span>Reports & Analytics</span></li>
            <li onClick={() => setActivePage("inventory")}><FaWarehouse className="icon" /> <span>Inventory Management</span></li>
            <li onClick={handleLogout}><FaSignOutAlt className="icon" /> <span>Logout</span></li>
          </ul>
        </aside>
        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  );
}

export default AdminDashboard;
