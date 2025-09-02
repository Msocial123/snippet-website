// backend/controllers/adminWishlistCartController.js
const db = require('../db');
const path = require("path");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

// Safe parse JSON arrays
function parseJsonArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  try {
    const parsed = JSON.parse(val);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toPublicUrl(filenameOrUrl) {
  if (!filenameOrUrl) return null;
  // if already URL
  if (/^https?:\/\//i.test(filenameOrUrl)) return filenameOrUrl;
  // remove leading uploads/ if present
  const clean = String(filenameOrUrl).replace(/^\/?uploads\//, "");
  return `${BASE_URL}/uploads/${clean}`;
}

// Returns first product image URL from product_details.Images (JSON)
function firstImageUrl(imagesVal) {
  const arr = parseJsonArray(imagesVal);
  if (arr.length === 0) return null;
  return toPublicUrl(arr[0]);
}

// --------------- Controllers ---------------

// Get a flattened list of all wishlist entries: user, product, price, image
exports.getAllWishlist = async (req, res) => {
  try {
    // Use your schema column names: wishlist (WishlistID, UID, PID), users (UID), products (PID), product_details.Images
    const sql = `
      SELECT w.WishlistID, w.UID, w.PID,
             CONCAT(u.FirstName, ' ', u.LastName) AS userName,
             p.Name AS productName, p.Price, pd.Images
      FROM wishlist w
      JOIN users u ON w.UID = u.UID
      JOIN products p ON w.PID = p.PID
      LEFT JOIN product_details pd ON p.PID = pd.PID
      ORDER BY u.FirstName, u.LastName, w.WishlistID;
    `;
    const [rows] = await db.query(sql);

    const mapped = rows.map((r) => ({
      WishlistID: r.WishlistID,
      UID: r.UID,
      PID: r.PID,
      user: r.userName,
      product: r.productName,
      price: r.Price,
      image: firstImageUrl(r.Images),
    }));

    res.json(mapped);
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};

exports.getWishlistByUser = async (req, res) => {
  const uid = req.params.uid;
  try {
    const sql = `
      SELECT w.WishlistID, w.UID, w.PID,
             CONCAT(u.FirstName, ' ', u.LastName) AS userName,
             p.Name AS productName, p.Price, pd.Images
      FROM wishlist w
      JOIN users u ON w.UID = u.UID
      JOIN products p ON w.PID = p.PID
      LEFT JOIN product_details pd ON p.PID = pd.PID
      WHERE w.UID = ?
      ORDER BY w.WishlistID;
    `;
    const [rows] = await db.query(sql, [uid]);
    const mapped = rows.map((r) => ({
      WishlistID: r.WishlistID,
      UID: r.UID,
      PID: r.PID,
      user: r.userName,
      product: r.productName,
      price: r.Price,
      image: firstImageUrl(r.Images),
    }));
    res.json(mapped);
  } catch (err) {
    console.error("Error fetching wishlist by user:", err);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};



// Get flattened list of cart entries (user, product, quantity, image)
// Note: `cart` has ImageURL column (nullable)
exports.getAllCart = async (req, res) => {
  try {
    const sql = `
      SELECT c.CartID, c.UID, c.PID, c.Quantity, c.ImageURL AS cartImageURL,
             CONCAT(u.FirstName, ' ', u.LastName) AS userName,
             p.Name AS productName, p.Price, pd.Images AS productImages
      FROM cart c
      JOIN users u ON c.UID = u.UID
      JOIN products p ON c.PID = p.PID
      LEFT JOIN product_details pd ON p.PID = pd.PID
      ORDER BY u.FirstName, u.LastName, c.CartID;
    `;
    const [rows] = await db.query(sql);

    const mapped = rows.map((r) => {
      // prefer cart.ImageURL if present; otherwise use first product image
      const imageUrl = r.cartImageURL ? toPublicUrl(r.cartImageURL) : firstImageUrl(r.productImages);

      return {
        CartID: r.CartID,
        UID: r.UID,
        PID: r.PID,
        user: r.userName,
        product: r.productName,
        quantity: r.Quantity,
        price: r.Price,
        image: imageUrl,
      };
    });

    res.json(mapped);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

exports.getCartByUser = async (req, res) => {
  const uid = req.params.uid;
  try {
    const sql = `
      SELECT c.CartID, c.UID, c.PID, c.Quantity, c.ImageURL AS cartImageURL,
             CONCAT(u.FirstName, ' ', u.LastName) AS userName,
             p.Name AS productName, p.Price, pd.Images AS productImages
      FROM cart c
      JOIN users u ON c.UID = u.UID
      JOIN products p ON c.PID = p.PID
      LEFT JOIN product_details pd ON p.PID = pd.PID
      WHERE c.UID = ?
      ORDER BY c.CartID;
    `;
    const [rows] = await db.query(sql, [uid]);

    const mapped = rows.map((r) => {
      const imageUrl = r.cartImageURL ? toPublicUrl(r.cartImageURL) : firstImageUrl(r.productImages);
      return {
        CartID: r.CartID,
        UID: r.UID,
        PID: r.PID,
        user: r.userName,
        product: r.productName,
        quantity: r.Quantity,
        price: r.Price,
        image: imageUrl,
      };
    });

    res.json(mapped);
  } catch (err) {
    console.error("Error fetching cart by user:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};
