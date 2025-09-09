


// const db = require("../db"); // mysql2/promise connection
// const express = require("express");
// const router = express.Router();

// // 1. Low Stock Alerts
// router.get("/low-stock", async (req, res) => {
//   try {
//     const threshold = 5;
//     const [results] = await db.query(
//       `SELECT p.Name AS Product, pv.StockQuantity AS Stock
//        FROM product_variants pv
//        JOIN products p ON pv.PID = p.PID
//        WHERE pv.StockQuantity < ?;`,
//       [threshold]
//     );
//     res.json(results);
//   } catch (err) {
//     console.error("Low stock error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // 2. Category Stock Summary
// router.get("/category-stock", async (req, res) => {
//   try {
//     const [results] = await db.query(
//       `SELECT p.Category, SUM(pv.StockQuantity) AS Stock
//        FROM products p
//        JOIN product_variants pv ON p.PID = pv.PID
//        GROUP BY p.Category;`
//     );
//     res.json(results);
//   } catch (err) {
//     console.error("Category stock error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // 3. Recent Restocks
// router.get("/recent-restocks", async (req, res) => {
//   try {
//     const [results] = await db.query(
//       `SELECT p.Name AS Product, r.RestockDate, r.StockAdded
//        FROM restocks r
//        JOIN product_variants pv ON r.VariantID = pv.VariantID
//        JOIN products p ON pv.PID = p.PID
//        ORDER BY r.RestockDate DESC
//        LIMIT 5;`
//     );
//     res.json(results);
//   } catch (err) {
//     console.error("Recent restocks error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


const db = require("../db"); // mysql2/promise connection
const express = require("express");
const router = express.Router();

// 1. Low Stock Alerts
router.get("/low-stock", async (req, res) => {
  try {
    const threshold = 5;
    const [results] = await db.query(
      `SELECT p.Name AS Product, pv.StockQuantity AS Stock
       FROM product_variants pv
       JOIN products p ON pv.PID = p.PID
       WHERE pv.StockQuantity < ?;`,
      [threshold]
    );
    res.json(results);
  } catch (err) {
    console.error("Low stock error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 2. Category Stock Summary
router.get("/category-stock", async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT p.Category, SUM(pv.StockQuantity) AS Stock
       FROM products p
       JOIN product_variants pv ON p.PID = pv.PID
       GROUP BY p.Category;`
    );
    res.json(results);
  } catch (err) {
    console.error("Category stock error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 3. Recent Restocks
router.get("/recent-restocks", async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT p.Name AS Product, r.RestockDate, r.StockAdded
       FROM restocks r
       JOIN product_variants pv ON r.VariantID = pv.VariantID
       JOIN products p ON pv.PID = p.PID
       ORDER BY r.RestockDate DESC
       LIMIT 5;`
    );
    res.json(results);
  } catch (err) {
    console.error("Recent restocks error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
