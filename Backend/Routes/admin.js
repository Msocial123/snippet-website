// routes/admin.js

const db = require("../db"); // ✅ MySQL connection pool
const express = require("express");
const router = express.Router();

// ✅ Dashboard Stats (Users, Products, Orders, Revenue)
router.get("/dashboard/stats", async (req, res) => {
  try {
    const [[{ totalUsers }]] = await db.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    const [[{ totalProducts }]] = await db.query(
      "SELECT COUNT(*) AS totalProducts FROM products WHERE IsActive = 1"
    );

    const [[{ totalOrders }]] = await db.query(
      "SELECT COUNT(*) AS totalOrders FROM orders"
    );

    const [[{ totalRevenue }]] = await db.query(
      "SELECT IFNULL(SUM(TotalPrice),0) AS totalRevenue FROM orders WHERE Status IN ('Paid','Shipped','Delivered')"
    );

    res.json({ totalUsers, totalProducts, totalOrders, totalRevenue });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});

// ✅ Low Stock Alerts
router.get("/dashboard/low-stock", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.Name, p.Price, pv.StockQuantity, p.Category
      FROM product_variants pv
      JOIN products p ON pv.PID = p.PID
      WHERE pv.StockQuantity <= 5
      ORDER BY pv.StockQuantity ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching low stock alerts:", err);
    res.status(500).json({ error: "Failed to fetch low stock alerts" });
  }
});

// ✅ Sales Trends (Monthly Revenue)
router.get("/dashboard/sales-trends", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        MONTH(OrderDate) AS month, 
        SUM(TotalPrice) AS revenue
      FROM orders
      WHERE Status IN ('Paid','Shipped','Delivered')
      GROUP BY MONTH(OrderDate)
      ORDER BY month ASC
    `);

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];
    const data = Array(12).fill(0);

    rows.forEach(r => {
      data[r.month - 1] = r.revenue;
    });

    res.json({ labels: months, data });
  } catch (err) {
    console.error("Error fetching sales trends:", err);
    res.status(500).json({ error: "Failed to fetch sales trends" });
  }
});

module.exports = router;
