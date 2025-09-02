// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import "./AdminUsers.css";

// function AdminUsers() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/admin/users")
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       axios.delete(`http://localhost:5000/api/admin/users/${id}`)
//         .then(() => setUsers(users.filter((u) => u.UID !== id)))
//         .catch((err) => console.error(err));
//     }
//   };

//   return (
//     <div className="users-container">
//       <div className="users-header">
//         <h2>User Management</h2>
//         <button className="add-user-btn">+ Add User</button>
//       </div>

//       <table className="users-table">
//         <thead>
//           <tr>
//             <th>UID</th>
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Contact</th>
//             <th>Address</th>
//             <th>Created At</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((u) => (
//               <tr key={u.UID}>
//                 <td>{u.UID}</td>
//                 <td>{u.FirstName} {u.LastName}</td>
//                 <td>{u.Email}</td>
//                 <td>{u.Contact}</td>
//                 <td>{u.Address}</td>
//                 <td>{new Date(u.CreatedAt).toLocaleDateString()}</td>
//                 <td>
//                   <button className="edit-btn">Edit</button>
//                   <button 
//                     className="delete-btn" 
//                     onClick={() => handleDelete(u.UID)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7">No users found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminUsers;


import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  // Delete user
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:5000/api/admin/users/${id}`)
        .then(() => fetchUsers())
        .catch((err) => console.error("Error deleting user:", err));
    }
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>User Management</h2>
      </div>

      {/* Users Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>UID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u.UID}>
                <td>{u.UID}</td>
                <td>{u.FirstName} {u.LastName}</td>
                <td>{u.Email}</td>
                <td>{u.Contact}</td>
                <td>{u.Address}</td>
                <td>{new Date(u.CreatedAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(u.UID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="7">No users found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;

