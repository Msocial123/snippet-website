// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql2/promise');

// // ✅ Update credentials here
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'swethar@2003', // change this
//   database: 'snitch_store',
// });

// router.get('/landing', async (req, res) => {
//   try {
//     const [products] = await pool.query(`
//       SELECT 
//         p.PID, p.Name, p.Price, p.Brand, p.ReviewSummary, pd.Images
//       FROM products p
//       JOIN product_details pd ON p.PID = pd.PDID
//       ORDER BY p.CreatedAt DESC
//       LIMIT 12
//     `);
//     res.json(products);
//   } catch (err) {
//     console.error('❌ SQL Error:', err); // FULL error
//     res.status(500).json({ message: 'Failed to fetch products' });
//   }
// });

// router.get('/reviews', async (req, res) => {
//   try {
//     const [reviews] = await pool.query(`
//       SELECT name, review 
//       FROM reviews
//       ORDER BY created_at DESC
//       LIMIT 6
//     `);
//     res.json(reviews);
//   } catch (err) {
//     console.error('❌ SQL Error (reviews):', err);
//     res.status(500).json({ message: 'Failed to fetch reviews' });
//   }
// });
// module.exports = router;




// backend/Controller/Landingpagecontroller.js
// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql2/promise');

// // DB connection
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'swethar@2003',
//   database: 'snitch_store',
// });

// // ✅ PRODUCTS route// Instead of '/landing', use:
// router.get('/products/landing', async (req, res) => {
//   const [products] = await pool.query(`
//     SELECT p.PID, p.Name, p.Price, p.Brand, p.ReviewSummary, pd.Images, pd.Description, p.Category
//     FROM products p
//     JOIN product_details pd ON p.PID = pd.PID
//     ORDER BY p.PID DESC
//     LIMIT 12
//   `);
//   res.json(products);
// });

// router.get('/products/reviews', async (req, res) => {
//   const [reviews] = await pool.query(`
//     SELECT u.FirstName, r.Comment
//     FROM reviews r
//     JOIN users u ON r.UID = u.UID
//     ORDER BY r.RID DESC
//     LIMIT 6
//   `);
//   res.json(reviews);
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql2/promise');

// // ✅ DB connection
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'swethar@2003',
//   database: 'snitch_store',
// });

// // ✅ Fetch 12 latest products
// router.get('/landing', async (req, res) => {
//   try {
//     const [products] = await pool.query(`
//       SELECT p.PID, p.Name, p.Price, p.Brand, p.ReviewSummary, pd.Images, pd.Description, p.Category
//       FROM products p
//       JOIN product_details pd ON p.PID = pd.PID
//       ORDER BY p.PID DESC
//       LIMIT 12
//     `);
//     res.json(products);
//   } catch (err) {
//     console.error('❌ Error fetching products:', err);
//     res.status(500).json({ message: 'Error fetching products' });
//   }
// });

// // ✅ Fetch latest 6 reviews
// router.get('/reviews', async (req, res) => {
//   try {
//     const [reviews] = await pool.query(`
//       SELECT u.FirstName AS name, r.Comment AS review
//       FROM reviews r
//       JOIN users u ON r.UID = u.UID
//       ORDER BY r.RID DESC
//       LIMIT 6
//     `);
//     res.json(reviews);
//   } catch (err) {
//     console.error('❌ Error fetching reviews:', err);
//     res.status(500).json({ message: 'Error fetching reviews' });
//   }
// });

// module.exports = router;





// Backend/controller.js
const express = require("express");
const router = express.Router();

const db = require("../db");

const mysql = require('mysql2/promise');

// ✅ DB connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'swethar@2003',
  database: 'snitch_store',
});


// ✅ Helper to get first image
const extractFirstImage = (imageData) => {
  try {
    const parsed = JSON.parse(imageData);
    return Array.isArray(parsed) ? parsed[0] : parsed;
  } catch {
    if (imageData?.includes(",")) {
      return imageData.split(",")[0];
    }
    return imageData;
  }
};

// ✅ Latest 12 Products for Landing Page
router.get("/landing", async (req, res) => {
  try {
    const [products] = await db.query(`
    SELECT p.PID, p.Name, p.Price, p.Category, p.Brand, p.ReviewSummary, p.CreatedAt, pd.Images
    FROM products p
    LEFT JOIN product_details pd ON p.PID = pd.PID
    ORDER BY p.CreatedAt DESC
  `);

    const formatted = products.map(p => ({
      ...p,
      Images: extractFirstImage(p.Images)
    }));

    res.json(formatted);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// ✅ All Reviews
// router.get("/reviews", async (req, res) => {
//   try {
//     const [reviews] = await db.query(`
//       SELECT r.ReviewID, r.PID, r.UID, r.Rating, r.Comment, u.FirstName, u.LastName
//       FROM reviews r
//       JOIN users u ON r.UID = u.UID
//       ORDER BY r.ReviewID DESC
//     `);
//     res.json(reviews);
//   } catch (err) {
//     console.error("Error fetching reviews:", err);
//     res.status(500).json({ error: "Failed to fetch reviews" });
//   }
// });

router.get('/reviews', async (req, res) => {
  try {
    const [reviews] = await db.query(`
      SELECT 
        r.Comment AS review, 
        r.Rating, 
        CONCAT(u.FirstName, ' ', u.LastName) AS name
      FROM reviews r
      JOIN users u ON r.UID = u.UID
      ORDER BY r.ReviewID DESC
    `);
    res.json(reviews);
  } catch (err) {
    console.error("❌ Error fetching reviews:", err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});


// ✅ Category-wise Products
router.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const [results] = await db.query(`
      SELECT p.PID, p.Name, p.Price, p.Category, p.Brand, pd.Images 
      FROM products p
      LEFT JOIN product_details pd ON p.PID = pd.PID
      WHERE LOWER(REPLACE(p.Category, ' ', '')) = ?
      ORDER BY p.CreatedAt DESC
    `, [category.toLowerCase().replace(/\s/g, '')]);

    const parsed = results.map(row => ({
      ...row,
      Images: extractFirstImage(row.Images)
    }));

    res.json(parsed);
  } catch (err) {
    console.error("❌ Error fetching category:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Additional Review Route (if used)
// router.get("/api/reviews", async (req, res) => {
//   try {
//     const [results] = await db.query(`
//       SELECT 
//         reviews.*,
//         users.FirstName AS reviewer_name,
//         products.Name AS product_name
//       FROM reviews
//       JOIN users ON reviews.UID = users.UID
//       JOIN products ON reviews.PID = products.PID
//       ORDER BY reviews.ReviewID DESC
//     `);
//     res.json(results);
//   } catch (err) {
//     console.error("Error fetching reviews:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

module.exports = router;





// const db = require("../db");
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // ---------- Config ----------
// const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// // ---------- Multer Setup ----------
// const uploadDir = path.join(__dirname, "..", "uploads");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
// });
// const upload = multer({ storage });

// // ---------- Helpers ----------
// /** convert array of files (from upload.any()) into map[fieldname] = [files...] */
// function filesMap(files = []) {
//   const map = {};
//   for (const f of files) {
//     if (!map[f.fieldname]) map[f.fieldname] = [];
//     map[f.fieldname].push(f);
//   }
//   return map;
// }

// const isHttp = (v) => typeof v === "string" && /^https?:\/\//i.test(v);
// const toUrl = (filename) => {
//   if (!filename) return null;
//   if (isHttp(filename)) return filename; // already a URL
//   const clean = String(filename).replace(/^\/?uploads\//, "");
//   return `${BASE_URL}/uploads/${clean}`;
// };

// const parseJsonSafe = (val) => {
//   if (!val) return [];
//   if (Array.isArray(val)) return val;
//   try {
//     const parsed = typeof val === "string" ? JSON.parse(val) : val;
//     return Array.isArray(parsed) ? parsed : [];
//   } catch {
//     return [];
//   }
// };

// const normalizeImages = (images) => parseJsonSafe(images).map(toUrl);
// const extractFirstImage = (images) => {
//   const arr = normalizeImages(images);
//   return arr[0] || null;
// };

// // ---------- Latest 12 for landing (first image only) ----------
// router.get("/landing", async (req, res) => {
//   try {
//     const [rows] = await db.query(
//       `SELECT p.PID, p.Name, p.Price, p.Category, p.Brand, p.ReviewSummary, p.CreatedAt, pd.Images
//          FROM products p
//          LEFT JOIN product_details pd ON p.PID = pd.PID
//          ORDER BY p.CreatedAt DESC
//          LIMIT 12`
//     );

//     const formatted = rows.map((p) => ({
//       ...p,
//       ImageURL: extractFirstImage(p.Images),       // ✅ single URL for cards
//       Images: normalizeImages(p.Images),           // optional: full array if you need it
//     }));

//     res.json(formatted);
//   } catch (err) {
//     console.error("❌ Error fetching landing products:", err);
//     res.status(500).json({ message: "Error fetching products" });
//   }
// });

// // ---------- Get all products (with details + variants) ----------
// router.get("/", async (req, res) => {
//   try {
//     const [products] = await db.query("SELECT * FROM products");
//     const results = [];

//     for (const p of products) {
//       const [[details]] = await db.query("SELECT * FROM product_details WHERE PID=?", [p.PID]);
//       const [variants] = await db.query(
//         "SELECT VariantID, Size, Color, StockQuantity, SKU, VariantImage FROM product_variants WHERE PID=?",
//         [p.PID]
//       );

//       const images = details?.Images ? normalizeImages(details.Images) : [];

//       results.push({
//         ...p,
//         ...(details || {}),
//         Images: images,
//         ImageURL: images[0] || null, // ✅ convenient first image
//         Variants: (variants || []).map((v) => ({
//           ...v,
//           VariantImageURL: toUrl(v.VariantImage), // ✅ full URL for variant image
//         })),
//       });
//     }

//     res.json(results);
//   } catch (err) {
//     console.error("Get all products error:", err);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

// // ---------- Get single product ----------
// router.get("/:pid", async (req, res) => {
//   const { pid } = req.params;
//   try {
//     const [[product]] = await db.query("SELECT * FROM products WHERE PID=?", [pid]);
//     if (!product) return res.status(404).json({ error: "Product not found" });

//     const [[details]] = await db.query("SELECT * FROM product_details WHERE PID=?", [pid]);
//     const [variants] = await db.query(
//       "SELECT VariantID, Size, Color, StockQuantity, SKU, VariantImage FROM product_variants WHERE PID=?",
//       [pid]
//     );

//     const images = details?.Images ? normalizeImages(details.Images) : [];

//     res.json({
//       ...product,
//       ...(details || {}),
//       Images: images,
//       ImageURL: images[0] || null,
//       Variants: (variants || []).map((v) => ({
//         ...v,
//         VariantImageURL: toUrl(v.VariantImage),
//       })),
//     });
//   } catch (err) {
//     console.error("Get single product error:", err);
//     res.status(500).json({ error: "Failed to fetch product" });
//   }
// });

// // ---------- Add Product (multipart/form-data with files) ----------
// router.post("/", upload.any(), async (req, res) => {
//   try {
//     const files = filesMap(req.files);

//     const Name = req.body.Name || req.body.name || null;
//     const Price = req.body.Price || req.body.price || null;
//     const Category = req.body.Category || req.body.category || null;
//     const Brand = req.body.Brand || req.body.brand || null;
//     const Gender = req.body.Gender || req.body.gender || null;
//     const Description = req.body.Description || req.body.description || null;
//     const Keywords = req.body.Keywords || req.body.keywords || null;

//     if (!Name || !Price) {
//       return res.status(400).json({ error: "Name and Price are required" });
//     }

//     let variants = [];
//     if (req.body.variants) {
//       try {
//         variants = JSON.parse(req.body.variants);
//         if (!Array.isArray(variants)) variants = [];
//       } catch {
//         variants = [];
//       }
//     }

//     // product-level images: store filenames in DB; URLs are built when reading
//     const productImages = (files["images"] || []).map((f) => f.filename);

//     const conn = await db.getConnection();
//     try {
//       await conn.beginTransaction();

//       const [prodRes] = await conn.query(
//         "INSERT INTO products (Name, Price, Category, Brand, Gender, CreatedAt) VALUES (?, ?, ?, ?, ?, NOW())",
//         [Name, Price, Category, Brand, Gender]
//       );
//       const pid = prodRes.insertId;

//       await conn.query(
//         "INSERT INTO product_details (PID, Description, Images, Keywords, Gender) VALUES (?, ?, ?, ?, ?)",
//         [pid, Description, productImages.length ? JSON.stringify(productImages) : null, Keywords, Gender]
//       );

//       for (const v of variants) {
//         const idx = typeof v._idx !== "undefined" ? v._idx : null;
//         let variantImageFilename = null;
//         if (idx !== null && files[`variantImage_${idx}`]?.length) {
//           variantImageFilename = files[`variantImage_${idx}`][0].filename;
//         }
//         const sku =
//           v.SKU || `${pid}-${v.Size || "NA"}-${v.Color || "NA"}-${Math.floor(Math.random() * 10000)}`;

//         await conn.query(
//           "INSERT INTO product_variants (PID, Size, Color, SKU, StockQuantity, VariantImage) VALUES (?, ?, ?, ?, ?, ?)",
//           [pid, v.Size, v.Color, sku, v.StockQuantity || 0, variantImageFilename]
//         );
//       }

//       await conn.commit();
//       res.status(201).json({ message: "Product created successfully", PID: pid });
//     } catch (txErr) {
//       await conn.rollback();
//       console.error("Transaction error inserting product and variants:", txErr);
//       res.status(500).json({ error: "Failed to create product (transaction)" });
//     } finally {
//       conn.release();
//     }
//   } catch (err) {
//     console.error("Add product error:", err);
//     res.status(500).json({ error: "Failed to add product" });
//   }
// });

// // ---------- Update Product (multipart/form-data) ----------
// router.put("/:pid", upload.any(), async (req, res) => {
//   const { pid } = req.params;
//   try {
//     const files = filesMap(req.files);

//     const Name = req.body.Name || req.body.name || null;
//     const Price = req.body.Price || req.body.price || null;
//     const Category = req.body.Category || req.body.category || null;
//     const Brand = req.body.Brand || req.body.brand || null;
//     const Gender = req.body.Gender || req.body.gender || null;
//     const Description = req.body.Description || req.body.description || null;
//     const Keywords = req.body.Keywords || req.body.keywords || null;

//     let variants = [];
//     if (req.body.variants) {
//       try {
//         variants = JSON.parse(req.body.variants);
//         if (!Array.isArray(variants)) variants = [];
//       } catch {
//         variants = [];
//       }
//     }

//     let productImages = null;
//     if (files["images"]) {
//       productImages = files["images"].map((f) => f.filename);
//     } else {
//       const [rows] = await db.query("SELECT Images FROM product_details WHERE PID=?", [pid]);
//       productImages = rows.length > 0 ? rows[0].Images : null; // may be JSON string
//     }

//     const conn = await db.getConnection();
//     try {
//       await conn.beginTransaction();

//       await conn.query(
//         "UPDATE products SET Name=?, Price=?, Category=?, Brand=?, Gender=? WHERE PID=?",
//         [Name, Price, Category, Brand, Gender, pid]
//       );

//       await conn.query(
//         "UPDATE product_details SET Description=?, Images=?, Keywords=?, Gender=? WHERE PID=?",
//         [
//           Description,
//           productImages
//             ? typeof productImages === "string"
//               ? productImages
//               : JSON.stringify(productImages)
//             : null,
//           Keywords,
//           Gender,
//           pid,
//         ]
//       );

//       await conn.query("DELETE FROM product_variants WHERE PID=?", [pid]);

//       for (const v of variants) {
//         const idx = typeof v._idx !== "undefined" ? v._idx : null;
//         let variantImageFilename = null;
//         if (idx !== null && files[`variantImage_${idx}`]?.length) {
//           variantImageFilename = files[`variantImage_${idx}`][0].filename;
//         }
//         const sku =
//           v.SKU || `${pid}-${v.Size || "NA"}-${v.Color || "NA"}-${Math.floor(Math.random() * 10000)}`;
//         await conn.query(
//           "INSERT INTO product_variants (PID, Size, Color, SKU, StockQuantity, VariantImage) VALUES (?, ?, ?, ?, ?, ?)",
//           [pid, v.Size, v.Color, sku, v.StockQuantity || 0, variantImageFilename]
//         );
//       }

//       await conn.commit();
//       res.json({ message: "Product updated successfully" });
//     } catch (txErr) {
//       await conn.rollback();
//       console.error("Update transaction error:", txErr);
//       res.status(500).json({ error: "Failed to update product (transaction)" });
//     } finally {
//       conn.release();
//     }
//   } catch (err) {
//     console.error("Update product error:", err);
//     res.status(500).json({ error: "Failed to update product" });
//   }
// });

// // ---------- Delete Product ----------
// router.delete("/:pid", async (req, res) => {
//   const { pid } = req.params;
//   try {
//     await db.query("DELETE FROM product_variants WHERE PID=?", [pid]);
//     await db.query("DELETE FROM product_details WHERE PID=?", [pid]);
//     await db.query("DELETE FROM products WHERE PID=?", [pid]);
//     res.json({ message: "Product deleted" });
//   } catch (err) {
//     console.error("Delete product error:", err);
//     res.status(500).json({ error: "Failed to delete product" });
//   }
// });

// module.exports = router;
