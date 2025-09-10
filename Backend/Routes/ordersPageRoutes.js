// // backend/routes/orders.js
// const express = require("express");
// const router = express.Router();
// const db = require("../db"); // your db.js connection

// // Get orders by user
// router.get("/user/:uid", async (req, res) => {
//   const { uid } = req.params;

//   try {
//     // Fetch orders for the user
//     const [orders] = await db.promise().query(
//       `SELECT o.OrderID, o.UserID, o.OrderDate, o.Status, o.Address,
//               o.PaymentMethod, o.PaymentStatus, o.TotalPrice, o.FinalAmount
//        FROM orders o
//        WHERE o.UserID = ?
//        ORDER BY o.OrderDate DESC`,
//       [uid]
//     );

//     if (orders.length === 0) {
//       return res.json([]);
//     }

//     // Fetch order items with product + variant info
//     const [items] = await db.promise().query(
//       `SELECT oi.OrderID, oi.Quantity, 
//               p.ProductName AS name, 
//               pv.Size AS size, 
//               pv.Color AS color, 
//               pv.Image AS image
//        FROM order_items oi
//        JOIN product_variants pv ON oi.VariantID = pv.VariantID
//        JOIN products p ON pv.ProductID = p.ProductID
//        WHERE oi.OrderID IN (?)`,
//       [orders.map((o) => o.OrderID)]
//     );

//     // Group items under each order
//     const ordersWithItems = orders.map((order) => {
//       return {
//         ...order,
//         Items: items.filter((item) => item.OrderID === order.OrderID),
//       };
//     });

//     res.json(ordersWithItems);
//   } catch (err) {
//     console.error("Error fetching orders:", err);
//     res.status(500).json({ error: "Failed to fetch orders" });
//   }
// });

// module.exports = router;

// backend/routes/orders.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // your db.js connection

// Get orders by user
router.get("/user/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    // Fetch orders for the user
    const [orders] = await db.promise().query(
      `SELECT o.OrderID, o.UserID, o.OrderDate, o.Status, o.Address,
              o.PaymentMethod, o.PaymentStatus, o.TotalPrice, o.FinalAmount
       FROM orders o
       WHERE o.UserID = ?
       ORDER BY o.OrderDate DESC`,
      [uid]
    );

    if (orders.length === 0) {
      return res.json([]);
    }

    // Fetch order items with product + variant info + image from product_details
    const [items] = await db.promise().query(
      `SELECT oi.OrderID, oi.Quantity, 
          p.ProductName AS name, 
          pv.Size AS size, 
          pv.Color AS color, 
          REPLACE(
            COALESCE(
              pv.Image, 
              JSON_UNQUOTE(JSON_EXTRACT(pd.Images, '$[0]'))
            ),
            'uploads/', ''
          ) AS image
   FROM order_items oi
   JOIN product_variants pv ON oi.VariantID = pv.VariantID
   JOIN products p ON pv.ProductID = p.ProductID
   LEFT JOIN product_details pd ON p.ProductID = pd.ProductID
   WHERE oi.OrderID IN (?)`,
      [orders.map((o) => o.OrderID)]
    );

    // Group items under each order
    const ordersWithItems = orders.map((order) => {
      return {
        ...order,
        Items: items.filter((item) => item.OrderID === order.OrderID),
      };
    });

    res.json(ordersWithItems);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
