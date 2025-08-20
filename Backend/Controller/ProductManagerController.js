// // controllers/ProductManagerController.js
// const db = require("../db");

// // ✅ Add Product
// exports.addProduct = (req, res) => {
//   const { Name, Price, Category, Gender, Images, Description, Sizes, Stock } = req.body;

//   if (!Name || !Price || isNaN(Price)) {
//     return res.status(400).json({ error: "Invalid product data" });
//   }

//   db.beginTransaction(err => {
//     if (err) {
//       console.error("Transaction Error:", err);
//       return res.status(500).json({ error: "Transaction failed" });
//     }

//     const productQuery = `
//       INSERT INTO products (Name, Price, Category, Gender, Images) 
//       VALUES (?, ?, ?, ?, ?)
//     `;

//     db.query(productQuery, [Name, Price, Category, Gender, JSON.stringify(Images || [])], (err, result) => {
//       if (err) {
//         console.error("Add Product Error:", err);
//         return db.rollback(() => res.status(500).json({ error: "Failed to add product" }));
//       }

//       const productId = result.insertId;

//       const detailsQuery = `
//         INSERT INTO product_details (PID, Description, Sizes, Stock)
//         VALUES (?, ?, ?, ?)
//       `;

//       db.query(detailsQuery, [productId, Description || "", JSON.stringify(Sizes || []), Stock || 0], (err2) => {
//         if (err2) {
//           console.error("Add Product Details Error:", err2);
//           return db.rollback(() => res.status(500).json({ error: "Failed to add product details" }));
//         }

//         db.commit(err3 => {
//           if (err3) {
//             console.error("Commit Error:", err3);
//             return db.rollback(() => res.status(500).json({ error: "Transaction commit failed" }));
//           }

//           res.status(201).json({ message: "✅ Product added successfully", productId });
//         });
//       });
//     });
//   });
// };

// // ✅ Edit Product
// exports.editProduct = (req, res) => {
//   const { id } = req.params;
//   const { Name, Price, Category, Gender, Images, Description, Sizes, Stock } = req.body;

//   if (!id || isNaN(id)) {
//     return res.status(400).json({ error: "Invalid Product ID" });
//   }

//   db.beginTransaction(err => {
//     if (err) {
//       console.error("Transaction Error:", err);
//       return res.status(500).json({ error: "Transaction failed" });
//     }

//     const updateProductQuery = `
//       UPDATE products 
//       SET Name = ?, Price = ?, Category = ?, Gender = ?, Images = ?
//       WHERE PID = ?
//     `;

//     db.query(updateProductQuery, [Name, Price, Category, Gender, JSON.stringify(Images || []), id], (err) => {
//       if (err) {
//         console.error("Edit Product Error:", err);
//         return db.rollback(() => res.status(500).json({ error: "Failed to update product" }));
//       }

//       const updateDetailsQuery = `
//         UPDATE product_details 
//         SET Description = ?, Sizes = ?, Stock = ?
//         WHERE PID = ?
//       `;

//       db.query(updateDetailsQuery, [Description || "", JSON.stringify(Sizes || []), Stock || 0, id], (err2) => {
//         if (err2) {
//           console.error("Edit Product Details Error:", err2);
//           return db.rollback(() => res.status(500).json({ error: "Failed to update product details" }));
//         }

//         db.commit(err3 => {
//           if (err3) {
//             console.error("Commit Error:", err3);
//             return db.rollback(() => res.status(500).json({ error: "Transaction commit failed" }));
//           }

//           res.status(200).json({ message: "✅ Product updated successfully" });
//         });
//       });
//     });
//   });
// };

// // ✅ Delete Product
// exports.deleteProduct = (req, res) => {
//   const { id } = req.params;

//   if (!id || isNaN(id)) {
//     return res.status(400).json({ error: "Invalid Product ID" });
//   }

//   const deleteDetailsQuery = `DELETE FROM product_details WHERE PID = ?`;
//   const deleteProductQuery = `DELETE FROM products WHERE PID = ?`;

//   db.query(deleteDetailsQuery, [id], (err) => {
//     if (err) {
//       console.error("Delete Product Details Error:", err);
//       return res.status(500).json({ error: "Failed to delete product details" });
//     }

//     db.query(deleteProductQuery, [id], (err2, result) => {
//       if (err2) {
//         console.error("Delete Product Error:", err2);
//         return res.status(500).json({ error: "Failed to delete product" });
//       }

//       if (result.affectedRows === 0) {
//         return res.status(404).json({ error: "Product not found" });
//       }

//       res.status(200).json({ message: "🗑️ Product deleted successfully" });
//     });
//   });
// };

// // ✅ Get All Products (with Pagination)
// exports.getAllProducts = (req, res) => {
//   const { page = 1, limit = 20 } = req.query;
//   const offset = (page - 1) * limit;

//   const query = `
//     SELECT p.PID, p.Name, p.Price, p.Category, p.Gender, p.Images, 
//            pd.Description, pd.Sizes, pd.Stock 
//     FROM products p
//     LEFT JOIN product_details pd ON p.PID = pd.PID
//     ORDER BY p.CreatedAt DESC
//     LIMIT ? OFFSET ?
//   `;

//   db.query(query, [Number(limit), Number(offset)], (err, results) => {
//     if (err) {
//       console.error("Fetch Products Error:", err);
//       return res.status(500).json({ error: "Failed to fetch products" });
//     }

//     const products = results.map(product => ({
//       ...product,
//       Images: JSON.parse(product.Images || "[]"),
//       Sizes: JSON.parse(product.Sizes || "[]"),
//     }));

//     res.status(200).json(products);
//   });
// };
