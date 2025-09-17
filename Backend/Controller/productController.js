const db = require("../db");

// ✅ 1. Get All Products (for homepage or general listing)
exports.getAllProducts = async (req, res) => {
  const query = `
    SELECT 
      p.PID, 
      p.Name, 
      p.Price, 
      p.Category, 
      p.Brand, 
      p.ReviewSummary, 
      pd.Images
    FROM products p
    LEFT JOIN product_details pd ON p.PID = pd.PID
    WHERE LOWER(p.Gender) = 'male' OR LOWER(pd.Gender) = 'male'
    ORDER BY p.CreatedAt DESC
  `;

  try {
    const [results] = await db.query(query);
    const parsed = results.map((row) => ({
      ...row,
      Images: extractFirstImage(row.Images),
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// Utility: Extract First Image from JSON or CSV string
function extractFirstImage(imagesField) {
  try {
    const parsed = JSON.parse(imagesField);
    return Array.isArray(parsed) ? parsed[0] : parsed;
  } catch (e) {
    return imagesField?.includes(",") ? imagesField.split(",")[0] : imagesField;
  }
}

// 1. Get All Products (example)
exports.getAllProducts = async (req, res) => {
  const query = `
    SELECT p.PID, p.Name, p.Price, p.Category, p.Brand, p.ReviewSummary, pd.Images
    FROM products p
    LEFT JOIN product_details pd ON p.PID = pd.PID
    WHERE LOWER(p.Gender) = 'male' OR LOWER(pd.Gender) = 'male'
    ORDER BY p.CreatedAt DESC
  `;
  try {
    const [results] = await db.query(query);
    const formatted = results.map(row => ({
      ...row,
      Images: extractFirstImage(row.Images),
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// 2. Get Products by Category (normalized slug matching)
exports.getProductsByCategory = async (req, res) => {
  let { category } = req.params;

  // Normalize incoming category slug: lowercase, strip spaces/dashes/underscores/&/slashes
  const normalizedSlug = category.toLowerCase().replace(/[\s\-_&\/]+/g, '');

  const query = `
    SELECT p.PID, p.Name, p.Price, p.Category, p.Brand, p.ReviewSummary, pd.Images
    FROM products p
    LEFT JOIN product_details pd ON p.PID = pd.PID
    WHERE REPLACE(REPLACE(REPLACE(REPLACE(LOWER(p.Category), ' ', ''), '-', ''), '_', ''), '&', '') = ?
    ORDER BY p.CreatedAt DESC
  `;

  try {
    const [results] = await db.query(query, [normalizedSlug]);
    if (results.length === 0) {
      return res.status(404).json({ message: "No products found in this category" });
    }
    const formatted = results.map(row => ({
      ...row,
      Images: extractFirstImage(row.Images),
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// 3. Get Women Products
exports.getWomenProducts = async (req, res) => {
  const query = `
    SELECT p.PID, p.Name, p.Price, p.Brand, pd.Images, pd.Description, p.Category
    FROM products p
    JOIN product_details pd ON p.PID = pd.PID
    WHERE LOWER(p.Gender) = 'female' OR LOWER(pd.Gender) = 'female'
    ORDER BY p.CreatedAt DESC
  `;
  try {
    const [products] = await db.query(query);
    const formatted = products.map(product => ({
      ...product,
      Images: Array.isArray(product.Images)
        ? product.Images[0]
        : typeof product.Images === "string" && product.Images.includes(",")
        ? product.Images.split(",")[0]
        : product.Images
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch women products' });
  }
};

// 4. Get Single Product Details by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT p.PID, p.Name, p.Price, p.Category, p.Brand, p.ReviewSummary,
           pd.Description, pd.Fabric, pd.Fit, pd.Images, pd.Keywords
    FROM products p
    LEFT JOIN product_details pd ON p.PID = pd.PID
    WHERE p.PID = ?
  `;
  try {
    const [results] = await db.query(query, [id]);
    if (results.length === 0) return res.status(404).json({ error: "Product not found" });
    const row = results[0];
    res.json({ ...row, Images: extractFirstImage(row.Images) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. Get Reviews for Product ID
exports.getProductReviews = async (req, res) => {
  const productId = req.params.id;
  const query = `
    SELECT r.ReviewID, r.PID, r.UID, u.FirstName, u.LastName, r.Rating, r.Comment, r.CreatedAt
    FROM reviews r
    JOIN users u ON r.UID = u.UID
    WHERE r.PID = ?
    ORDER BY r.CreatedAt DESC
  `;
  try {
    const [results] = await db.query(query, [productId]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 6. Get All Categories
exports.getAllCategories = async (req, res) => {
  const query = `SELECT DISTINCT Category FROM products ORDER BY Category`;
  try {
    const [rows] = await db.query(query);
    res.json(rows.map(row => row.Category));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories", details: err.message });
  }
};
