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
import React, { useState } from "react";
import "./AdminDashboard.css";
import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";   // ✅ Import new component

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "products":
        return <AdminProducts />;
      case "orders":
        return <h2>Order Management Coming Soon</h2>;
      case "users":
        return <AdminUsers />;   // ✅ Show users here
      case "wishlist":
        return <h2>Wishlist & Cart Viewer Coming Soon</h2>;
      case "reports":
        return <h2>Reports & Analytics Coming Soon</h2>;
      default:
        return <h2>Welcome to Admin Dashboard</h2>;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <ul className="sidebar-menu">
          <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
          <li onClick={() => setActivePage("products")}>Product Management</li>
          <li onClick={() => setActivePage("orders")}>Order Management</li>
          <li onClick={() => setActivePage("users")}>User Management</li>
          <li onClick={() => setActivePage("wishlist")}>Wishlist & Cart Viewer</li>
          <li onClick={() => setActivePage("reports")}>Reports & Analytics</li>
          <li>Logout</li>
        </ul>
      </aside>

      <main className="main-content">{renderContent()}</main>
    </div>
  );
}

export default AdminDashboard;
