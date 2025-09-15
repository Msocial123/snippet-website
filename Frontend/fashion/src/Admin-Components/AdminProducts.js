


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
  imagePreviews: [], // ✅ for previews
  variants: [{ Size: "", Color: "", StockQuantity: "", VariantImage: null }],
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
    updateForm({
      variants: [
        ...form.variants,
        { Size: "", Color: "", StockQuantity: "", VariantImage: null },
      ],
    });

  const removeVariantRow = (idx) =>
    updateForm({ variants: form.variants.filter((_, i) => i !== idx) });

  const changeVariant = (idx, key, value) => {
    const copy = [...form.variants];
    copy[idx] = { ...copy[idx], [key]: value };
    updateForm({ variants: copy });
  };

  // ----- Handle Product Images with Previews -----
  const handleProductImages = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => URL.createObjectURL(file));

    updateForm({
      images: files,
      imagePreviews: previews,
    });
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
      .filter((v) => v.Size && v.Color && v.StockQuantity !== "")
      .map((v, idx) => ({
        Size: v.Size,
        Color: v.Color,
        StockQuantity: Number(v.StockQuantity) || 0,
        _idx: idx,
      }));

    fd.append("variants", JSON.stringify(cleanVariants));

    // ✅ product-level images
    if (form.images && form.images.length) {
      form.images.forEach((file) => {
        fd.append("images", file);
      });
    }

    // variant-level images
    form.variants.forEach((v, idx) => {
      if (v.VariantImage) {
        fd.append(`variantImage_${idx}`, v.VariantImage);
      }
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    if (editId) {
      await axios.put(
        `http://localhost:5000/api/admin/products/${editId}`,
        fd,
        config
      );
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
    const { data } = await axios.get(
      `http://localhost:5000/api/admin/products/${product.PID}`
    );
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
      imagePreviews: [], // reset previews on edit
      variants:
        (data.Variants || []).map((v) => ({
          Size: v.Size,
          Color: v.Color,
          StockQuantity: v.StockQuantity,
          VariantImage: null,
        })) || [
          { Size: "", Color: "", StockQuantity: "", VariantImage: null },
        ],
    });
  };

  const handleRestock = async (product) => {
    const restockValue = prompt(
      "Enter new stock quantity to add for all variants:"
    );
    if (!restockValue || isNaN(restockValue))
      return alert("Invalid stock quantity");

    try {
      await axios.put(
        `http://localhost:5000/api/admin/products/${product.PID}/restock`,
        { stock: Number(restockValue) }
      );
      await fetchProducts();
      alert("Stock updated successfully");
    } catch (err) {
      console.error("Restock failed", err);
      alert("Failed to update stock");
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Product Management</h2>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          placeholder="Name"
          value={form.Name}
          onChange={(e) => updateForm({ Name: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.Price}
          onChange={(e) => updateForm({ Price: e.target.value })}
          required
        />

        {/* Category */}
        <select
          value={form.Category}
          onChange={(e) => updateForm({ Category: e.target.value })}
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

        {/* Gender */}
        <select
          value={form.Gender}
          onChange={(e) => updateForm({ Gender: e.target.value })}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unisex">Unisex</option>
        </select>

        <input
          placeholder="Brand"
          value={form.Brand}
          onChange={(e) => updateForm({ Brand: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.Description}
          onChange={(e) => updateForm({ Description: e.target.value })}
        />

        {/* ✅ Product images with preview */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleProductImages}
        />
        <div className="preview-container">
          {form.imagePreviews.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`preview-${i}`}
              width="70"
              style={{
                marginRight: "8px",
                marginTop: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          ))}
        </div>

        <input
          placeholder="Keywords (comma separated)"
          value={form.Keywords}
          onChange={(e) => updateForm({ Keywords: e.target.value })}
        />

        {/* Variants Editor */}
        <div className="variants-block">
          <div className="variants-header">
            <strong>Variants</strong>
            <button type="button" onClick={addVariantRow}>
              + Add Variant
            </button>
          </div>

          {form.variants.map((v, idx) => (
            <div className="variant-row" key={idx}>
              <input
                placeholder="Size (e.g., S, M, L, XL)"
                value={v.Size}
                onChange={(e) => changeVariant(idx, "Size", e.target.value)}
              />
              <input
                placeholder="Color (e.g., White, Black)"
                value={v.Color}
                onChange={(e) => changeVariant(idx, "Color", e.target.value)}
              />
              <input
                type="number"
                placeholder="Stock"
                value={v.StockQuantity}
                onChange={(e) =>
                  changeVariant(idx, "StockQuantity", e.target.value)
                }
              />

              {/* Variant Image Upload */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  changeVariant(idx, "VariantImage", e.target.files[0])
                }
              />

              <button type="button" onClick={() => removeVariantRow(idx)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <button type="submit">{editId ? "Update Product" : "Add Product"}</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ ...emptyForm });
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Product List */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Price</th><th>Category</th>
            <th>Gender</th><th>Brand</th><th>Images</th>
            <th>Rating</th><th>Variants</th><th>Actions</th>
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

              {/* ✅ Product-level images */}
              <td>
                {Array.isArray(p.Images) &&
                  p.Images.map((img, i) => (
                    <img
                      key={i}
                      src={`http://localhost:5000/uploads/${img}`}
                      alt={`product-${p.PID}-${i}`}
                      width="60"
                      style={{ marginRight: "8px", borderRadius: "4px" }}
                    />
                  ))}
              </td>

              <td>{p.AvgRating || "N/A"}</td>

              {/* ✅ Variants */}
              <td>
                {Array.isArray(p.Variants) &&
                  p.Variants.map((v, i) => (
                    <div key={i}>
                      {v.Size} - {v.Color} ({v.StockQuantity})
                      {v.VariantImage && (
                        <img
                          src={`http://localhost:5000/uploads/${v.VariantImage}`}
                          alt={`${v.Color}-${v.Size}`}
                          width="60"
                          style={{ marginLeft: "8px", borderRadius: "4px" }}
                        />
                      )}
                    </div>
                  ))}
              </td>

              {/* Actions */}
              <td>
                <button onClick={() => handleEdit(p)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(p.PID)} className="delete-btn">
                  Delete
                </button>
                <button onClick={() => handleRestock(p)} className="restock-btn">
                  Restock
                </button>
              </td>
            </tr>
          ))}
          {(!products || !products.length) && (
            <tr>
              <td colSpan="10">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;

