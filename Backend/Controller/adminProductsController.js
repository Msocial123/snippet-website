
const db = require("../db");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ---------- Multer Setup ----------
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage });

// ---------- Helpers ----------
/**
 * Build an object map of files by their fieldname
 * req.files when using upload.any() is an array; convert to map for easy lookup
 */
function filesMap(files = []) {
  const map = {};
  for (const f of files) {
    if (!map[f.fieldname]) map[f.fieldname] = [];
    map[f.fieldname].push(f);
  }
  return map;
}

// ---------- Get all products ----------
router.get("/", async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products");
    const results = [];

    for (const p of products) {
      const [[details]] = await db.query("SELECT * FROM product_details WHERE PID=?", [p.PID]);
      const [variants] = await db.query(
        "SELECT VariantID, Size, Color, StockQuantity, SKU, VariantImage FROM product_variants WHERE PID=?",
        [p.PID]
      );

      // If product_details.Images is JSON stored as string, keep as parsed array (otherwise return as-is)
      let images = null;
      if (details && details.Images) {
        try {
          images = JSON.parse(details.Images);
        } catch (e) {
          images = details.Images;
        }
      }

      results.push({
        ...p,
        ...(details || {}),
        Images: images,
        Variants: variants || [],
      });
    }

    res.json(results);
  } catch (err) {
    console.error("Get all products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ---------- Get single product ----------
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const [[product]] = await db.query("SELECT * FROM products WHERE PID=?", [pid]);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const [details] = await db.query("SELECT * FROM product_details WHERE PID=?", [pid]);
    const [variants] = await db.query(
      "SELECT VariantID, Size, Color, StockQuantity, SKU, VariantImage FROM product_variants WHERE PID=?",
      [pid]
    );

    let images = null;
    if (details[0] && details[0].Images) {
      try {
        images = JSON.parse(details[0].Images);
      } catch (e) {
        images = details[0].Images;
      }
    }

    res.json({
      ...product,
      ...(details[0] || {}),
      Images: images,
      Variants: variants || [],
    });
  } catch (err) {
    console.error("Get single product error:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// ---------- Add Product (multipart/form-data with files) ----------
// Accept any files (we'll pick by fieldname): product images use fieldname "images", variant images "variantImage_<idx>"
router.post("/", upload.any(), async (req, res) => {
  // Note: req.body contains text fields when using multer
  try {
    // Debug log (uncomment when troubleshooting)
    // console.log("Incoming body:", req.body);
    // console.log("Incoming files:", req.files);

    const files = filesMap(req.files);

    // Read fields from req.body (case-sensitive as used in frontend)
    const Name = req.body.Name || req.body.name || null;
    const Price = req.body.Price || req.body.price || null;
    const Category = req.body.Category || req.body.category || null;
    const Brand = req.body.Brand || req.body.brand || null;
    const Gender = req.body.Gender || req.body.gender || null;
    const Description = req.body.Description || req.body.description || null;
    const Keywords = req.body.Keywords || req.body.keywords || null;

    if (!Name || !Price) {
      return res.status(400).json({ error: "Name and Price are required" });
    }

    // Parse variants from JSON string (frontend appends "variants" as JSON string)
    let variants = [];
    if (req.body.variants) {
      try {
        variants = JSON.parse(req.body.variants);
        if (!Array.isArray(variants)) variants = [];
      } catch (e) {
        variants = [];
      }
    }

    // product-level images -> filenames array
    let productImages = [];
    if (files["images"]) {
      productImages = files["images"].map((f) => f.filename);
    }

    // Start transaction
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      // Insert into products (adjust columns according to your schema)
      const [prodRes] = await conn.query(
        "INSERT INTO products (Name, Price, Category, Brand, Gender, CreatedAt) VALUES (?, ?, ?, ?, ?, NOW())",
        [Name, Price, Category, Brand, Gender]
      );
      const pid = prodRes.insertId;

      // Insert into product_details (Images stored as JSON array)
      await conn.query(
        "INSERT INTO product_details (PID, Description, Images, Keywords, Gender) VALUES (?, ?, ?, ?, ?)",
        [pid, Description, productImages.length ? JSON.stringify(productImages) : null, Keywords, Gender]
      );

      // Insert variants. We support variant image fieldnames like variantImage_0, variantImage_1 (index _idx from frontend)
      for (const v of variants) {
        // each variant in cleanVariants had an _idx property mapping to frontend variant index
        const idx = typeof v._idx !== "undefined" ? v._idx : null;

        // look for a file named variantImage_<idx>
        let variantImageFilename = null;
        if (idx !== null && files[`variantImage_${idx}`] && files[`variantImage_${idx}`].length > 0) {
          variantImageFilename = files[`variantImage_${idx}`][0].filename;
        }

        // generate a SKU if not provided (safe default)
        const sku = v.SKU || `${pid}-${v.Size || "NA"}-${v.Color || "NA"}-${Math.floor(Math.random() * 10000)}`;

        await conn.query(
          "INSERT INTO product_variants (PID, Size, Color, SKU, StockQuantity, VariantImage) VALUES (?, ?, ?, ?, ?, ?)",
          [pid, v.Size, v.Color, sku, v.StockQuantity || 0, variantImageFilename]
        );
      }

      await conn.commit();
      res.status(201).json({ message: "Product created successfully", PID: pid });
    } catch (txErr) {
      await conn.rollback();
      console.error("Transaction error inserting product and variants:", txErr);
      res.status(500).json({ error: "Failed to create product (transaction)" });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// ---------- Update Product (multipart/form-data) ----------
router.put("/:pid", upload.any(), async (req, res) => {
  const { pid } = req.params;
  try {
    const files = filesMap(req.files);

    const Name = req.body.Name || req.body.name || null;
    const Price = req.body.Price || req.body.price || null;
    const Category = req.body.Category || req.body.category || null;
    const Brand = req.body.Brand || req.body.brand || null;
    const Gender = req.body.Gender || req.body.gender || null;
    const Description = req.body.Description || req.body.description || null;
    const Keywords = req.body.Keywords || req.body.keywords || null;

    // parse variants JSON if provided
    let variants = [];
    if (req.body.variants) {
      try {
        variants = JSON.parse(req.body.variants);
        if (!Array.isArray(variants)) variants = [];
      } catch (e) {
        variants = [];
      }
    }

    // product-level images
    let productImages = null;
    if (files["images"]) {
      productImages = files["images"].map((f) => f.filename);
    } else {
      const [rows] = await db.query("SELECT Images FROM product_details WHERE PID=?", [pid]);
      productImages = rows.length > 0 ? rows[0].Images : null;
    }

    // Begin transaction
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      // 1️⃣ Check if variants are used in carts
      const [cartItems] = await conn.query(
        "SELECT * FROM cart WHERE VariantID IN (SELECT VariantID FROM product_variants WHERE PID=?)",
        [pid]
      );

      if (cartItems.length > 0) {
        await conn.rollback();
        return res.status(400).json({
          message: "Cannot update/delete product. Variants exist in user carts.",
        });
      }

      // 2️⃣ Update product main row
      await conn.query(
        "UPDATE products SET Name=?, Price=?, Category=?, Brand=?, Gender=?, IsActive=1 WHERE PID=?",
        [Name, Price, Category, Brand, Gender, pid]
      );

      // 3️⃣ Update details
      await conn.query(
        "UPDATE product_details SET Description=?, Images=?, Keywords=?, Gender=? WHERE PID=?",
        [
          Description,
          productImages
            ? typeof productImages === "string"
              ? productImages
              : JSON.stringify(productImages)
            : null,
          Keywords,
          Gender,
          pid,
        ]
      );

      // 4️⃣ Replace variants (only if no cart conflict)
      await conn.query("DELETE FROM product_variants WHERE PID=?", [pid]);

      for (const v of variants) {
        const idx = typeof v._idx !== "undefined" ? v._idx : null;
        let variantImageFilename = null;
        if (
          idx !== null &&
          files[`variantImage_${idx}`] &&
          files[`variantImage_${idx}`].length > 0
        ) {
          variantImageFilename = files[`variantImage_${idx}`][0].filename;
        }
        const sku =
          v.SKU ||
          `${pid}-${v.Size || "NA"}-${v.Color || "NA"}-${Math.floor(
            Math.random() * 10000
          )}`;
        await conn.query(
          "INSERT INTO product_variants (PID, Size, Color, SKU, StockQuantity, VariantImage) VALUES (?, ?, ?, ?, ?, ?)",
          [pid, v.Size, v.Color, sku, v.StockQuantity || 0, variantImageFilename]
        );
      }

      await conn.commit();
      res.json({ message: "Product updated successfully" });
    } catch (txErr) {
      await conn.rollback();
      console.error("Update transaction error:", txErr);
      res.status(500).json({ error: "Failed to update product (transaction)" });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});


// PUT /api/admin/products/:id/restock

// Restock a product
router.put("/:pid/restock", async (req, res) => {
  const { pid } = req.params;
  const { stock } = req.body;

  if (!stock || isNaN(stock)) {
    return res.status(400).json({ error: "Invalid stock value" });
  }

  try {
    // 1. Update stock
    await db.query(
      "UPDATE product_variants SET StockQuantity = StockQuantity + ? WHERE PID = ?",
      [Number(stock), pid]
    );

    // 2. Log restock entry
    await db.query(
      "INSERT INTO restocks (VariantID, StockAdded, RestockDate) VALUES ((SELECT VariantID FROM product_variants WHERE PID = ? LIMIT 1), ?, NOW())",
      [pid, Number(stock)]
    );

    res.json({ message: "Stock updated and restock logged successfully" });
  } catch (err) {
    console.error("Restock product error:", err);
    res.status(500).json({ error: "Failed to update stock" });
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
    console.error("Delete product error:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
