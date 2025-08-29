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
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Contact: "",
    Address: "",
  });
  const [editingUser, setEditingUser] = useState(null); // to track edit mode
  const [showForm, setShowForm] = useState(false); // show/hide popup

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

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle add/update submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      // Update existing user
      axios
        .put(`http://localhost:5000/api/admin/users/${editingUser.UID}`, formData)
        .then(() => {
          fetchUsers();
          resetForm();
        })
        .catch((err) => console.error("Error updating user:", err));
    } else {
      // Add new user
      axios
        .post("http://localhost:5000/api/admin/users", formData)
        .then(() => {
          fetchUsers();
          resetForm();
        })
        .catch((err) => console.error("Error adding user:", err));
    }
  };

  // Handle delete user
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:5000/api/admin/users/${id}`)
        .then(() => setUsers(users.filter((u) => u.UID !== id)))
        .catch((err) => console.error("Error deleting user:", err));
    }
  };

  // Handle edit user (fetch by ID)
  const handleEdit = (id) => {
    axios
      .get(`http://localhost:5000/api/admin/users/${id}`)
      .then((res) => {
        setFormData(res.data);
        setEditingUser(res.data);
        setShowForm(true);
      })
      .catch((err) => console.error("Error fetching user:", err));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      FirstName: "",
      LastName: "",
      Email: "",
      Contact: "",
      Address: "",
    });
    setEditingUser(null);
    setShowForm(false);
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>User Management</h2>
        <button className="add-user-btn" onClick={() => setShowForm(true)}>
          + Add User
        </button>
      </div>

      {/* User Form Modal */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingUser ? "Edit User" : "Add User"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="FirstName"
                placeholder="First Name"
                value={formData.FirstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="LastName"
                placeholder="Last Name"
                value={formData.LastName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="Email"
                placeholder="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="Contact"
                placeholder="Contact"
                value={formData.Contact}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="Address"
                placeholder="Address"
                value={formData.Address}
                onChange={handleChange}
                required
              />
              <button type="submit">
                {editingUser ? "Update User" : "Add User"}
              </button>
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

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
                <td>
                  {u.FirstName} {u.LastName}
                </td>
                <td>{u.Email}</td>
                <td>{u.Contact}</td>
                <td>{u.Address}</td>
                <td>{new Date(u.CreatedAt).toLocaleDateString()}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(u.UID)}>
                    Edit
                  </button>
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
            <tr>
              <td colSpan="7">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
