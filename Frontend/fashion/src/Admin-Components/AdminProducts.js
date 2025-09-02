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

const emptyForm = {
  Name: "",
  Price: "",
  Category: "",
  Gender: "",
  Brand: "Snippet",
  Description: "",
  Keywords: "",
  images: [], // product-level images
  variants: [
    { Size: "", Color: "", StockQuantity: "", VariantImage: null }
  ],
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/products");
    setProducts(res.data || []);
  };

  const updateForm = (patch) => setForm((f) => ({ ...f, ...patch }));

  // ----- Variant row helpers -----
  const addVariantRow = () =>
    updateForm({ variants: [...form.variants, { Size: "", Color: "", StockQuantity: "", VariantImage: null }] });

  const removeVariantRow = (idx) =>
    updateForm({ variants: form.variants.filter((_, i) => i !== idx) });

  const changeVariant = (idx, key, value) => {
    const copy = [...form.variants];
    copy[idx] = { ...copy[idx], [key]: value };
    updateForm({ variants: copy });
  };

  // ----- Submit -----
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("Name", form.Name);
    fd.append("Price", form.Price);
    fd.append("Category", form.Category);
    fd.append("Gender", form.Gender);
    fd.append("Brand", form.Brand);
    fd.append("Description", form.Description);
    fd.append("Keywords", form.Keywords);

    // clean variants (without files, just JSON data)
    const cleanVariants = (form.variants || [])
      .filter(v => v.Size && v.Color && (v.StockQuantity !== ""))
      .map((v, idx) => ({
        Size: v.Size,
        Color: v.Color,
        StockQuantity: Number(v.StockQuantity) || 0,
        _idx: idx, // keep track for matching file
      }));

    fd.append("variants", JSON.stringify(cleanVariants));

    // product-level images
    if (form.images && form.images.length) {
      for (let i = 0; i < form.images.length; i++) {
        fd.append("images", form.images[i]);
      }
    }

    // variant-level images
    form.variants.forEach((v, idx) => {
      if (v.VariantImage) {
        fd.append(`variantImage_${idx}`, v.VariantImage);
      }
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    if (editId) {
      await axios.put(`http://localhost:5000/api/admin/products/${editId}`, fd, config);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/admin/products", fd, config);
    }

    setForm({ ...emptyForm });
    await fetchProducts();
  };

  const handleDelete = async (pid) => {
    if (!window.confirm("Delete this product?")) return;
    await axios.delete(`http://localhost:5000/api/admin/products/${pid}`);
    await fetchProducts();
  };

  const handleEdit = async (product) => {
    const { data } = await axios.get(`http://localhost:5000/api/admin/products/${product.PID}`);
    setEditId(product.PID);
    setForm({
      Name: data.Name,
      Price: data.Price,
      Category: data.Category,
      Gender: data.Gender,
      Brand: data.Brand || "Snippet",
      Description: data.Description || "",
      Keywords: data.Keywords || "",
      images: [],
      variants: (data.Variants || []).map(v => ({
        Size: v.Size,
        Color: v.Color,
        StockQuantity: v.StockQuantity,
        VariantImage: null, // cannot prefill file input
      })) || [{ Size: "", Color: "", StockQuantity: "", VariantImage: null }],
    });
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Product Management</h2>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input placeholder="Name" value={form.Name} onChange={(e) => updateForm({ Name: e.target.value })} required />
        <input type="number" step="0.01" placeholder="Price" value={form.Price} onChange={(e) => updateForm({ Price: e.target.value })} required />

        {/* Category */}
        <select value={form.Category} onChange={(e) => updateForm({ Category: e.target.value })} required>
          <option value="">Select Category</option>
          <option value="Formal">Formal</option>
          <option value="Casual">Casual</option>
          <option value="Oversized Tees">Oversized Tees</option>
          <option value="T-shirts and Polos">T-shirts and Polos</option>
          <option value="Jackets and Outerwears">Jackets and Outerwears</option>
          <option value="Cargo Pants">Cargo Pants</option>
          <option value="Hoodies">Hoodies</option>
        </select>

        {/* Gender */}
        <select value={form.Gender} onChange={(e) => updateForm({ Gender: e.target.value })} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unisex">Unisex</option>
        </select>

        <input placeholder="Brand" value={form.Brand} onChange={(e) => updateForm({ Brand: e.target.value })} />
        <textarea placeholder="Description" value={form.Description} onChange={(e) => updateForm({ Description: e.target.value })} />

        {/* Product images */}
        <input type="file" multiple accept="image/*" onChange={(e) => updateForm({ images: e.target.files })} />

        <input placeholder="Keywords (comma separated)" value={form.Keywords} onChange={(e) => updateForm({ Keywords: e.target.value })} />

        {/* Variants Editor */}
        <div className="variants-block">
          <div className="variants-header">
            <strong>Variants</strong>
            <button type="button" onClick={addVariantRow}>+ Add Variant</button>
          </div>

          {form.variants.map((v, idx) => (
            <div className="variant-row" key={idx}>
              <input placeholder="Size (e.g., S, M, L, XL)" value={v.Size} onChange={(e) => changeVariant(idx, "Size", e.target.value)} />
              <input placeholder="Color (e.g., White, Black)" value={v.Color} onChange={(e) => changeVariant(idx, "Color", e.target.value)} />
              <input type="number" placeholder="Stock" value={v.StockQuantity} onChange={(e) => changeVariant(idx, "StockQuantity", e.target.value)} />
              
              {/* Variant Image Upload */}
              <input type="file" accept="image/*" onChange={(e) => changeVariant(idx, "VariantImage", e.target.files[0])} />

              <button type="button" onClick={() => removeVariantRow(idx)}>Remove</button>
            </div>
          ))}
        </div>

        <button type="submit">{editId ? "Update Product" : "Add Product"}</button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setForm({ ...emptyForm }); }}>
            Cancel Edit
          </button>
        )}
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
          {(products || []).map((p) => (
            <tr key={p.PID}>
              <td>{p.PID}</td>
              <td>{p.Name}</td>
              <td>₹{Number(p.Price).toFixed(2)}</td>
              <td>{p.Category}</td>
              <td>{p.Gender || "-"}</td>
              <td>{p.Brand}</td>
              <td>{p.AvgRating || "N/A"}</td>
              <td>
                {Array.isArray(p.Variants) &&
                  p.Variants.map((v, i) => (
                    <div key={i}>
                      {v.Size} - {v.Color} ({v.StockQuantity})
                      {v.VariantImageURL && (
                        <img
                          src={`http://localhost:5000/uploads/${v.VariantImageURL}`}
                          alt={`${v.Color}-${v.Size}`}
                          width="60"
                          style={{ marginLeft: "8px", borderRadius: "4px" }}
                        />
                      )}
                    </div>
                  ))}
              </td>
              <td>
                <button onClick={() => handleEdit(p)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(p.PID)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
          {(!products || !products.length) && (
            <tr><td colSpan="9">No products found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
