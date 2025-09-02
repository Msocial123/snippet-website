// import React, { useState } from "react";
// import "./AdminDashboard.css";
// import AdminProducts from "./AdminProducts";

// function AdminDashboard() {
//   const [activePage, setActivePage] = useState("dashboard");

//   const renderContent = () => {
//     switch (activePage) {
//       case "products":
//         return <AdminProducts />;
//       case "orders":
//         return <h2>Order Management Coming Soon</h2>;
//       case "users":
//         return <h2>User Management Coming Soon</h2>;
//       case "wishlist":
//         return <h2>Wishlist & Cart Viewer Coming Soon</h2>;
//       case "reports":
//         return <h2>Reports & Analytics Coming Soon</h2>;
//       default:
//         return <h2>Welcome to Admin Dashboard</h2>;
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar only */}
//       <aside className="sidebar">
//         <ul className="sidebar-menu">
//           <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
//           <li onClick={() => setActivePage("products")}>Product Management</li>
//           <li onClick={() => setActivePage("orders")}>Order Management</li>
//           <li onClick={() => setActivePage("users")}>User Management</li>
//           <li onClick={() => setActivePage("wishlist")}>Wishlist & Cart Viewer</li>
//           <li onClick={() => setActivePage("reports")}>Reports & Analytics</li>
//           <li>Logout</li>
//         </ul>
//       </aside>

//       {/* Main content */}
//       <main className="main-content">{renderContent()}</main>
//     </div>
//   );
// }

// export default AdminDashboard;




// import React, { useState } from "react";
// import "./AdminDashboard.css";
// import AdminProducts from "./AdminProducts";
// import AdminUsers from "./AdminUsers";

// // Import icons from react-icons
// import { FaTachometerAlt, FaBoxOpen, FaClipboardList, FaUsers, FaHeart, FaChartBar, FaWarehouse, FaSignOutAlt } from "react-icons/fa";

// function AdminDashboard() {
//   const [activePage, setActivePage] = useState("dashboard");

//   const renderContent = () => {
//     switch (activePage) {
//       case "products":
//         return <AdminProducts />;
//       case "orders":
//         return <h2>Order Management Coming Soon</h2>;
//       case "users":
//         return <AdminUsers />;
//       case "wishlist":
//         return <h2>Wishlist & Cart Viewer Coming Soon</h2>;
//       case "reports":
//         return <h2>Reports & Analytics Coming Soon</h2>;
//       case "inventory":
//         return <h2>Inventory Management Coming Soon</h2>;
//       default:
//         return <h2>Welcome to Admin Dashboard</h2>;
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <aside className="sidebar">
//         <ul className="sidebar-menu">
//           <li onClick={() => setActivePage("dashboard")}>
//             <FaTachometerAlt className="icon" /> Dashboard
//           </li>
//           <li onClick={() => setActivePage("products")}>
//             <FaBoxOpen className="icon" /> Product Management
//           </li>
//           <li onClick={() => setActivePage("orders")}>
//             <FaClipboardList className="icon" /> Order Management
//           </li>
//           <li onClick={() => setActivePage("users")}>
//             <FaUsers className="icon" /> User Management
//           </li>
//           <li onClick={() => setActivePage("wishlist")}>
//             <FaHeart className="icon" /> Wishlist & Cart Viewer
//           </li>
//           <li onClick={() => setActivePage("reports")}>
//             <FaChartBar className="icon" /> Reports & Analytics
//           </li>
//           <li onClick={() => setActivePage("inventory")}>
//             <FaWarehouse className="icon" /> Inventory Management
//           </li>
//           <li>
//             <FaSignOutAlt className="icon" /> Logout
//           </li>
//         </ul>
//       </aside>

//       <main className="main-content">{renderContent()}</main>
//     </div>
//   );
// }

// export default AdminDashboard;




import React, { useState } from "react";
import "./AdminDashboard.css";
import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import WishlistCartViewer from "./WishlistCartViewer"; 
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaHeart,
  FaChartBar,
  FaWarehouse,
  FaSignOutAlt,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales Trends",
        data: [14000, 12000, 4000, 5000, 8000, 20000, 15000, 10000, 8000, 6000, 4000, 2000],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const renderContent = () => {
    switch (activePage) {
      case "products":
        return <AdminProducts />;
      case "orders":
        return <h2>Order Management Coming Soon</h2>;
      case "users":
        return <AdminUsers />;
      case "wishlist":
       return <WishlistCartViewer />;

      case "reports":
        return <h2>Reports & Analytics Coming Soon</h2>;
      case "inventory":
        return <h2>Inventory Management Coming Soon</h2>;
      default:
        return (
          <div className="dashboard-content">
            <h2>Dashboard</h2>

            {/* Stats Cards */}
            <div className="stats-cards">
              <div className="card">
                <FaUsers className="card-icon" />
                <div>
                  <p>Total Users</p>
                  <h3>1,250</h3>
                </div>
              </div>
              <div className="card">
                <FaBoxOpen className="card-icon" />
                <div>
                  <p>Total Products</p>
                  <h3>300</h3>
                </div>
              </div>
              <div className="card">
                <FaShoppingCart className="card-icon" />
                <div>
                  <p>Total Orders</p>
                  <h3>1,234</h3>
                </div>
              </div>
              <div className="card">
                <FaDollarSign className="card-icon" />
                <div>
                  <p>Revenue</p>
                  <h3>$45.67</h3>
                </div>
              </div>
            </div>

            {/* Low Stock Alerts Table */}
            <div className="table-container">
              <h3>Low Stock Alerts</h3>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Product A</td>
                    <td>$25</td>
                    <td>5</td>
                    <td>Electronics</td>
                  </tr>
                  <tr>
                    <td>Product B</td>
                    <td>$15</td>
                    <td>3</td>
                    <td>Home</td>
                  </tr>
                  <tr>
                    <td>Product C</td>
                    <td>$30</td>
                    <td>8</td>
                    <td>Sports</td>
                  </tr>
                  <tr>
                    <td>Product D</td>
                    <td>$20</td>
                    <td>2</td>
                    <td>Electronics</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Sales Trends Chart */}
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
            <li onClick={() => setActivePage("dashboard")}>
              <FaTachometerAlt className="icon" /> <span>Dashboard</span>
            </li>
            <li onClick={() => setActivePage("products")}>
              <FaBoxOpen className="icon" /> <span>Product Management</span>
            </li>
            <li onClick={() => setActivePage("orders")}>
              <FaClipboardList className="icon" /> <span>Order Management</span>
            </li>
            <li onClick={() => setActivePage("users")}>
              <FaUsers className="icon" /> <span>User Management</span>
            </li>
            <li onClick={() => setActivePage("wishlist")}>
              <FaHeart className="icon" /> <span>Wishlist & Cart Viewer</span>
            </li>
            <li onClick={() => setActivePage("reports")}>
              <FaChartBar className="icon" /> <span>Reports & Analytics</span>
            </li>
            <li onClick={() => setActivePage("inventory")}>
              <FaWarehouse className="icon" /> <span>Inventory Management</span>
            </li>
            <li>
              <FaSignOutAlt className="icon" /> <span>Logout</span>
            </li>
          </ul>
        </aside>
        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  );
}

export default AdminDashboard;
