// // import express from "express";
// const db = require("../db");// your MySQL connection
// const express = require("express");
// const router = express.Router();


// /**
//  * Get all products with details, variants, and average rating
//  */
// router.get("/", async (req, res) => {
//   try {
//     const [products] = await db.query(`
//       SELECT 
//     p.PID, p.Name, p.Price, p.Category, p.Brand, p.ReviewSummary,
//     ANY_VALUE(pd.Description) AS Description,
//     ANY_VALUE(pd.Images) AS Images,
//     ANY_VALUE(pd.Keywords) AS Keywords,
//     ROUND(AVG(r.Rating),1) AS AvgRating,
//     GROUP_CONCAT(CONCAT(v.Size, ' - ', v.Color, ' (Stock:', v.StockQuantity, ')')) AS Variants
//   FROM products p
//   LEFT JOIN product_details pd ON p.PID = pd.PID
//   LEFT JOIN product_variants v ON p.PID = v.PID
//   LEFT JOIN reviews r ON p.PID = r.PID
//   GROUP BY p.PID
// `);
//     res.json(products);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

// /**
//  * Add new product
//  */
// router.post("/", async (req, res) => {
//   const { name, price, category, brand, description, images, keywords } = req.body;
//   try {
//     const [result] = await db.query(
//       "INSERT INTO products (Name, Price, Category, Brand) VALUES (?, ?, ?, ?)",
//       [name, price, category, brand]
//     );

//     const pid = result.insertId;
//     await db.query(
//       "INSERT INTO product_details (PID, Description, Images, Keywords) VALUES (?, ?, ?, ?)",
//       [pid, description, images, keywords]
//     );

//     res.json({ message: "Product created", pid });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to add product" });
//   }
// });

// /**
//  * Update product
//  */
// router.put("/:pid", async (req, res) => {
//   const { pid } = req.params;
//   const { name, price, category, brand, description, images, keywords } = req.body;
//   try {
//     await db.query(
//       "UPDATE products SET Name=?, Price=?, Category=?, Brand=? WHERE PID=?",
//       [name, price, category, brand, pid]
//     );

//     await db.query(
//       "UPDATE product_details SET Description=?, Images=?, Keywords=? WHERE PID=?",
//       [description, images, keywords, pid]
//     );

//     res.json({ message: "Product updated" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to update product" });
//   }
// });

// /**
//  * Delete product
//  */
// router.delete("/:pid", async (req, res) => {
//   const { pid } = req.params;
//   try {
//     await db.query("DELETE FROM product_variants WHERE PID=?", [pid]);
//     await db.query("DELETE FROM product_details WHERE PID=?", [pid]);
//     await db.query("DELETE FROM products WHERE PID=?", [pid]);
//     res.json({ message: "Product deleted" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to delete product" });
//   }
// });

// module.exports = router;




const db = require("../db");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// ---------- Multer Setup ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure uploads/ exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ---------- Get all products ----------
router.get("/", async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT 
        p.PID, p.Name, p.Price, p.Category, p.Brand, p.ReviewSummary,
        ANY_VALUE(pd.Description) AS Description,
        ANY_VALUE(pd.Images) AS Images,
        ANY_VALUE(pd.Keywords) AS Keywords,
        ROUND(AVG(r.Rating),1) AS AvgRating,
        GROUP_CONCAT(CONCAT(v.Size, ' - ', v.Color, ' (Stock:', v.StockQuantity, ')')) AS Variants
      FROM products p
      LEFT JOIN product_details pd ON p.PID = pd.PID
      LEFT JOIN product_variants v ON p.PID = v.PID
      LEFT JOIN reviews r ON p.PID = r.PID
      GROUP BY p.PID
    `);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ---------- Add Product ----------
router.post("/", upload.single("images"), async (req, res) => {
  try {
    const { name, price, category, brand, description, keywords } = req.body;
    let images = null;

    if (req.file) {
      images = JSON.stringify([req.file.filename]); // store as ["filename.jpg"]
    }

    const [result] = await db.query(
      "INSERT INTO products (Name, Price, Category, Brand) VALUES (?, ?, ?, ?)",
      [name, price, category, brand]
    );

    const pid = result.insertId;

    await db.query(
      "INSERT INTO product_details (PID, Description, Images, Keywords) VALUES (?, ?, ?, ?)",
      [pid, description, images, keywords]
    );

    res.json({ message: "Product created", pid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// ---------- Update Product ----------
router.put("/:pid", upload.single("images"), async (req, res) => {
  const { pid } = req.params;

  try {
    const { name, price, category, brand, description, keywords } = req.body;

    let images;

    if (req.file) {
      // new image uploaded
      images = JSON.stringify([req.file.filename]);
    } else {
      // keep old image if not re-uploaded
      const [rows] = await db.query(
        "SELECT Images FROM product_details WHERE PID=?",
        [pid]
      );
      if (rows.length > 0 && rows[0].Images) {
        images = rows[0].Images;
      } else {
        images = null;
      }
    }

    // update products
    await db.query(
      "UPDATE products SET Name=?, Price=?, Category=?, Brand=? WHERE PID=?",
      [name, price, category, brand, pid]
    );

    // update details
    await db.query(
      "UPDATE product_details SET Description=?, Images=?, Keywords=? WHERE PID=?",
      [description, images, keywords, pid]
    );

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});


// ---------- Delete Product ----------
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    await db.query("DELETE FROM product_variants WHERE PID=?", [pid]);
    await db.query("DELETE FROM product_details WHERE PID=?", [pid]);
    await db.query("DELETE FROM products WHERE PID=?", [pid]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
