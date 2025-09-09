// backend/controllers/reportsController.js
const db = require("../db"); // mysql2 promise pool
const { format } = require("date-fns");

// Helper: safe parse date strings
const parseDate = (d) => {
  if (!d) return null;
  const dt = new Date(d);
  if (isNaN(dt)) return null;
  return dt;
};

// Top products (by quantity sold) within date range and optional category
exports.topProducts = async (req, res) => {
  try {
    const { startDate, endDate, category, limit = 10 } = req.query;
    const params = [];
    let where = "";

    if (startDate && endDate) {
      where += " AND o.OrderDate BETWEEN ? AND ? ";
      params.push(startDate, endDate);
    }

    if (category) {
      where += " AND p.Category = ? ";
      params.push(category);
    }

    const sql = `
      SELECT p.PID, p.Name, p.Category, SUM(oi.Quantity) AS total_sold, SUM(oi.Price * oi.Quantity) AS revenue
      FROM order_items oi
      JOIN orders o ON oi.OrderID = o.OrderID
      JOIN products p ON oi.PID = p.PID
      WHERE 1=1 ${where}
      GROUP BY p.PID
      ORDER BY total_sold DESC
      LIMIT ?
    `;

    params.push(parseInt(limit, 10));
    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("topProducts error:", err);
    res.status(500).json({ error: "Failed to fetch top products" });
  }
};

// Top customers (by total_spent) within date range
exports.topCustomers = async (req, res) => {
  try {
    const { startDate, endDate, limit = 10 } = req.query;
    const params = [];
    let where = "";

    if (startDate && endDate) {
      where += " WHERE o.OrderDate BETWEEN ? AND ? ";
      params.push(startDate, endDate);
    }

    const sql = `
      SELECT u.UID, CONCAT(u.FirstName, ' ', u.LastName) AS name,
             COUNT(o.OrderID) AS orders_count,
             SUM(o.TotalPrice) AS total_spent
      FROM orders o
      JOIN users u ON o.UID = u.UID
      ${where}
      GROUP BY u.UID
      ORDER BY total_spent DESC
      LIMIT ?
    `;
    params.push(parseInt(limit, 10));
    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("topCustomers error:", err);
    res.status(500).json({ error: "Failed to fetch top customers" });
  }
};

// Inventory status - combine product_variants stock & product level (if variants not used)
exports.inventoryStatus = async (req, res) => {
  try {
    // If variants exist, return variant-level stock, otherwise return product-level (assumes product_variants.StockQuantity)
    const sql = `
      SELECT p.PID, p.Name,
        COALESCE(SUM(pv.StockQuantity), 0) AS total_stock
      FROM products p
      LEFT JOIN product_variants pv ON p.PID = pv.PID
      GROUP BY p.PID
      ORDER BY total_stock ASC
      LIMIT 50
    `;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    console.error("inventoryStatus error:", err);
    res.status(500).json({ error: "Failed to fetch inventory status" });
  }
};

// Orders over time (daily totals) for charting
exports.ordersOverTime = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const params = [];
    let where = "";

    if (startDate && endDate) {
      where = " WHERE o.OrderDate BETWEEN ? AND ? ";
      params.push(startDate, endDate);
    }

    // Group by date (YYYY-MM-DD)
    const sql = `
      SELECT DATE(o.OrderDate) AS day,
             COUNT(o.OrderID) AS orders_count,
             SUM(o.TotalPrice) AS revenue
      FROM orders o
      ${where}
      GROUP BY day
      ORDER BY day ASC
      LIMIT 1000
    `;

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("ordersOverTime error:", err);
    res.status(500).json({ error: "Failed to fetch orders over time" });
  }
};

// Quick export endpoint that returns combined data JSON (optional)
exports.exportReport = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    // run the main three reports in parallel
    const [topProductsRows] = await db.query(
      `SELECT p.PID, p.Name, SUM(oi.Quantity) AS total_sold, SUM(oi.Price * oi.Quantity) AS revenue
       FROM order_items oi
       JOIN orders o ON oi.OrderID = o.OrderID
       JOIN products p ON oi.PID = p.PID
       WHERE (? IS NULL OR o.OrderDate >= ?) AND (? IS NULL OR o.OrderDate <= ?) ${category ? " AND p.Category = ?" : "" }
       GROUP BY p.PID ORDER BY total_sold DESC LIMIT 100`,
      [startDate || null, startDate || null, endDate || null, endDate || null].concat(category ? [category] : [])
    );

    const [topCustomersRows] = await db.query(
      `SELECT u.UID, CONCAT(u.FirstName,' ',u.LastName) AS name, SUM(o.TotalPrice) AS total_spent
       FROM orders o JOIN users u ON o.UID = u.UID
       WHERE (? IS NULL OR o.OrderDate >= ?) AND (? IS NULL OR o.OrderDate <= ?)
       GROUP BY u.UID ORDER BY total_spent DESC LIMIT 100`,
      [startDate || null, startDate || null, endDate || null, endDate || null]
    );

    const [inventoryRows] = await db.query(
      `SELECT p.PID, p.Name, COALESCE(SUM(pv.StockQuantity),0) AS total_stock
       FROM products p LEFT JOIN product_variants pv ON p.PID = pv.PID
       GROUP BY p.PID ORDER BY total_stock ASC LIMIT 100`
    );

    res.json({
      topProducts: topProductsRows,
      topCustomers: topCustomersRows,
      inventory: inventoryRows,
    });
  } catch (err) {
    console.error("exportReport error:", err);
    res.status(500).json({ error: "Failed to export report" });
  }
};
