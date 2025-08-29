// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./AdminProducts.css";
// function AdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "",
//     brand: "",
//     description: "",
//     images: "",
//     keywords: ""
//   });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const res = await axios.get("http://localhost:5000/api/admin/products");
//     setProducts(res.data);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:5000/api/admin/products", form);
//     setForm({ name: "", price: "", category: "", brand: "", description: "", images: "", keywords: "" });
//     fetchProducts();
//   };

//   const handleDelete = async (pid) => {
//     await axios.delete(`http://localhost:5000/api/admin/products/${pid}`);
//     fetchProducts();
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Product Management</h2>

//       {/* Add Product Form */}
//       <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4">
//         {Object.keys(form).map((key) => (
//           <input
//             key={key}
//             placeholder={key}
//             value={form[key]}
//             onChange={(e) => setForm({ ...form, [key]: e.target.value })}
//             className="border p-2 rounded"
//           />
//         ))}
//         <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded">
//           Add Product
//         </button>
//       </form>

//       {/* Product List */}
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th>ID</th><th>Name</th><th>Price</th><th>Category</th><th>Brand</th>
//             <th>Rating</th><th>Variants</th><th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((p) => (
//             <tr key={p.PID} className="border-t">
//               <td>{p.PID}</td>
//               <td>{p.Name}</td>
//               <td>₹{p.Price}</td>
//               <td>{p.Category}</td>
//               <td>{p.Brand}</td>
//               <td>{p.AvgRating || "N/A"}</td>
//               <td>{p.Variants || "No Variants"}</td>
//               <td>
//                 <button onClick={() => handleDelete(p.PID)} className="bg-red-500 text-white px-2 py-1 rounded">
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminProducts;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./AdminProducts.css";

// function AdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "",
//     brand: "",
//     description: "",
//     images: "",
//     keywords: ""
//   });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const res = await axios.get("http://localhost:5000/api/admin/products");
//     setProducts(res.data);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:5000/api/admin/products", form);
//     setForm({ name: "", price: "", category: "", brand: "", description: "", images: "", keywords: "" });
//     fetchProducts();
//   };

//   const handleDelete = async (pid) => {
//     await axios.delete(`http://localhost:5000/api/admin/products/${pid}`);
//     fetchProducts();
//   };

//   return (
//     <div className="admin-container">
//       <h2 className="admin-title">Product Management</h2>

//       {/* Add Product Form */}
//       <form onSubmit={handleSubmit} className="admin-form">
//         {Object.keys(form).map((key) => (
//           <input
//             key={key}
//             placeholder={key}
//             value={form[key]}
//             onChange={(e) => setForm({ ...form, [key]: e.target.value })}
//           />
//         ))}
//         <button type="submit">Add Product</button>
//       </form>

//       {/* Product List */}
//       <table className="admin-table">
//         <thead>
//           <tr>
//             <th>ID</th><th>Name</th><th>Price</th><th>Category</th><th>Brand</th>
//             <th>Rating</th><th>Variants</th><th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((p) => (
//             <tr key={p.PID}>
//               <td>{p.PID}</td>
//               <td>{p.Name}</td>
//               <td>₹{p.Price}</td>
//               <td>{p.Category}</td>
//               <td>{p.Brand}</td>
//               <td>{p.AvgRating || "N/A"}</td>
//               <td>{p.Variants || "No Variants"}</td>
//               <td>
//                 <button onClick={() => handleDelete(p.PID)} className="delete-btn">
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminProducts;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    gender: "",
    brand: "Snippet", // default
    description: "",
    images: null, // file upload
    keywords: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/products");
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  Object.keys(form).forEach((key) => {
    formData.append(key, form[key]);
  });

  if (editId) {
    await axios.put(`http://localhost:5000/api/admin/products/${editId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    setEditId(null);
  } else {
    await axios.post("http://localhost:5000/api/admin/products", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }

  setForm({
    name: "",
    price: "",
    category: "",
    gender: "",
    brand: "Snippet",
    description: "",
    images: null,
    keywords: ""
  });
  fetchProducts();
};

  const handleDelete = async (pid) => {
    await axios.delete(`http://localhost:5000/api/admin/products/${pid}`);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.Name,
      price: product.Price,
      category: product.Category,
      gender: product.Gender,
      brand: "Snippet",
      description: product.Description,
      images: null, // keep empty, user can re-upload
      keywords: product.Keywords
    });
    setEditId(product.PID);
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Product Management</h2>

      {/* Add / Edit Product Form */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        {/* Category Dropdown */}
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Formal">Formal</option>
          <option value="Casual">Casual</option>
          <option value="Oversized Tees">Oversized Tees</option>
          <option value="T-shirts and Polos">T-shirts and Polos</option>
          <option value="Jackets and Outerwears">Jackets and Outerwears</option>
          <option value="Cargo Pants">Cargo Pants</option>
          <option value="Hoodies">Hoodies</option>
        </select>

        {/* Gender Dropdown */}
        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Brand (fixed Snippet) */}
        <input value="Snippet" disabled />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Image Upload */}
        <input
          type="file"
          onChange={(e) => setForm({ ...form, images: e.target.files[0] })}
          accept="image/*"
        />

        <input
          placeholder="Keywords"
          value={form.keywords}
          onChange={(e) => setForm({ ...form, keywords: e.target.value })}
        />

        <button type="submit">{editId ? "Update Product" : "Add Product"}</button>
      </form>

      {/* Product List */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Price</th><th>Category</th>
            <th>Gender</th><th>Brand</th><th>Rating</th>
            <th>Variants</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.PID}>
              <td>{p.PID}</td>
              <td>{p.Name}</td>
              <td>₹{p.Price}</td>
              <td>{p.Category}</td>
              <td>{p.Gender}</td>
              <td>{p.Brand}</td>
              <td>{p.AvgRating || "N/A"}</td>
              <td>{p.Variants || "No Variants"}</td>
              <td>
                <button onClick={() => handleEdit(p)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(p.PID)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
