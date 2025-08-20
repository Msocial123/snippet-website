// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./ProductManager.css";

// const ProductManager = () => {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({
//     Name: "",
//     Price: "",
//     Category: "",
//     Gender: "",
//     Description: "",
//     Sizes: "",
//     Stock: "",
//     Images: ""
//   });

//   // Fetch all products
//   const fetchProducts = async () => {
//     const res = await axios.get("http://localhost:5000/api/manageproducts/all");
//     setProducts(res.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Add Product
//   const addProduct = async () => {
//     const payload = {
//       ...form,
//       Sizes: form.Sizes ? form.Sizes.split(",").map(s => s.trim()) : [],
//       Images: form.Images ? form.Images.split(",").map(i => i.trim()) : []
//     };
//     await axios.post("http://localhost:5000/api/manageproducts/add", payload);
//     fetchProducts();
//   };

//   // Edit Product
//   const editProduct = async (id) => {
//     const payload = {
//       ...form,
//       Sizes: form.Sizes ? form.Sizes.split(",").map(s => s.trim()) : [],
//       Images: form.Images ? form.Images.split(",").map(i => i.trim()) : []
//     };
//     await axios.put(`http://localhost:5000/api/manageproducts/edit/${id}`, payload);
//     fetchProducts();
//   };

//   // Delete Product
//   const deleteProduct = async (id) => {
//     await axios.delete(`http://localhost:5000/api/manageproducts/delete/${id}`);
//     fetchProducts();
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Product Manager</h2>

//       {/* Product Form */}
//       <div className="mb-6 space-y-2">
//         <input placeholder="Name" onChange={(e) => setForm({ ...form, Name: e.target.value })} />
//         <input placeholder="Price" onChange={(e) => setForm({ ...form, Price: e.target.value })} />
//         <input placeholder="Category" onChange={(e) => setForm({ ...form, Category: e.target.value })} />
//         <input placeholder="Gender" onChange={(e) => setForm({ ...form, Gender: e.target.value })} />
//         <input placeholder="Sizes (comma separated)" onChange={(e) => setForm({ ...form, Sizes: e.target.value })} />
//         <input placeholder="Stock" onChange={(e) => setForm({ ...form, Stock: e.target.value })} />
//         <input placeholder="Images (comma separated URLs)" onChange={(e) => setForm({ ...form, Images: e.target.value })} />
//         <textarea placeholder="Description" onChange={(e) => setForm({ ...form, Description: e.target.value })}></textarea>
//         <button onClick={addProduct} className="bg-green-500 text-white px-4 py-2">Add Product</button>
//       </div>

//       {/* Product List */}
//       <table className="border w-full">
//         <thead>
//           <tr>
//             <th>Name</th><th>Price</th><th>Category</th><th>Gender</th><th>Stock</th><th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((p) => (
//             <tr key={p.PID}>
//               <td>{p.Name}</td>
//               <td>₹{p.Price}</td>
//               <td>{p.Category}</td>
//               <td>{p.Gender}</td>
//               <td>{p.Stock}</td>
//               <td>
//                 <button onClick={() => editProduct(p.PID)} className="bg-yellow-500 text-white px-2 py-1">Edit</button>
//                 <button onClick={() => deleteProduct(p.PID)} className="bg-red-500 text-white px-2 py-1 ml-2">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductManager;
