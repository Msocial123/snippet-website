// // Backend/Routes/adminOrders.js
// const express = require("express");
// const db = require("../db"); // mysql2/promise pool
// const router = express.Router();

// const mapOrderRow = (row) => ({
//   orderId: row.OrderID,
//   customer: row.Customer,
//   date: row.OrderDate,
//   totalPrice: Number(row.TotalPrice),
//   status: row.Status,
//   paymentMethod: row.PaymentMethod,
//   // Accept both possible keys defensively just in case
//   address: row.address || row.Address || null,
// });

// // GET /api/admin/orders?status=&q=&page=1&limit=10
// router.get("/", async (req, res) => {
//   try {
//     const { status, q, page = 1, limit = 10 } = req.query;
//     const offset = (Number(page) - 1) * Number(limit);

//     const where = [];
//     const params = [];

//     if (status) { where.push("o.Status = ?"); params.push(status); }
//     if (q) {
//       where.push(`(u.FirstName LIKE ? OR u.LastName LIKE ? OR CONCAT(u.FirstName,' ',u.LastName) LIKE ? OR o.OrderID = ?)`);
//       params.push(`%${q}%`, `%${q}%`, `%${q}%`, Number.isFinite(Number(q)) ? Number(q) : -1);
//     }
//     const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

//     const [rows] = await db.query(
//       `SELECT 
//          o.OrderID,
//          CONCAT(u.FirstName,' ',u.LastName) AS Customer,
//          o.OrderDate,
//          o.TotalPrice,
//          o.Status,
//          o.PaymentMethod,
//          u.Address AS address
//        FROM orders o
//        JOIN users u ON o.UID = u.UID
//        ${whereSql}
//        ORDER BY o.OrderDate DESC
//        LIMIT ? OFFSET ?`,
//       [...params, Number(limit), offset]
//     );

//     // debug: log first row (remove in production)
//     console.log("DEBUG GET /api/admin/orders — sample row:", rows[0]);

//     const [[{ total }]] = await db.query(
//       `SELECT COUNT(*) as total FROM orders o JOIN users u ON o.UID = u.UID ${whereSql}`,
//       params
//     );

//     res.json({
//       data: rows.map(mapOrderRow),
//       page: Number(page),
//       limit: Number(limit),
//       total,
//     });
//   } catch (err) {
//     console.error("GET /orders error", err);
//     res.status(500).json({ message: "Failed to fetch orders" });
//   }
// });

// // GET /api/admin/orders/:id (summary + items + payment)
// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const [[order]] = await db.query(
//       `SELECT 
//          o.*,
//          CONCAT(u.FirstName,' ',u.LastName) AS Customer,
//          u.Email, u.Contact, u.Address AS address
//        FROM orders o
//        JOIN users u ON o.UID = u.UID
//        WHERE o.OrderID = ?`,
//       [id]
//     );

//     console.log("DEBUG GET /api/admin/orders/:id — order row:", order);

//     if (!order) return res.status(404).json({ message: "Order not found" });

//     const [items] = await db.query(
//       `SELECT oi.OrderItemID, p.Name AS ProductName, pv.Size, pv.Color, oi.Quantity, oi.Price
//        FROM order_items oi
//        JOIN products p ON oi.PID = p.PID
//        JOIN product_variants pv ON oi.VariantID = pv.VariantID
//        WHERE oi.OrderID = ?`,
//       [id]
//     );

//     const [[payment]] = await db.query(
//       `SELECT PaymentID, PaymentMethod, PaymentStatus, TransactionID, PaidAt
//        FROM payments
//        WHERE OrderID = ?
//        ORDER BY PaidAt DESC
//        LIMIT 1`,
//       [id]
//     );

//     res.json({
//       order: {
//         orderId: order.OrderID,
//         customer: order.Customer,
//         email: order.Email,
//         contact: order.Contact,
//         address: order.address || order.Address || null,
//         orderDate: order.OrderDate,
//         totalPrice: Number(order.TotalPrice),
//         status: order.Status,
//         paymentMethod: order.PaymentMethod,
//         discountAmount: Number(order.DiscountAmount || 0),
//       },
//       items: items.map((i) => ({
//         orderItemId: i.OrderItemID,
//         productName: i.ProductName,
//         size: i.Size,
//         color: i.Color,
//         quantity: i.Quantity,
//         price: Number(i.Price),
//         lineTotal: Number(i.Price) * i.Quantity,
//       })),
//       payment: payment || null,
//     });
//   } catch (err) {
//     console.error("GET /orders/:id error", err);
//     res.status(500).json({ message: "Failed to fetch order details" });
//   }
// });

// // PATCH status unchanged
// router.patch("/:id/status", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body || {};
//     const allowed = ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"];
//     if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid status" });

//     const [result] = await db.query(`UPDATE orders SET Status = ? WHERE OrderID = ?`, [status, id]);
//     if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });

//     res.json({ message: "Status updated", orderId: Number(id), status });
//   } catch (err) {
//     console.error("PATCH /orders/:id/status error", err);
//     res.status(500).json({ message: "Failed to update status" });
//   }
// });

// module.exports = router;


const express = require("express");
const db = require("../db"); // mysql2/promise pool
const router = express.Router();

/** Utility: map raw SQL row to frontend format */
const mapOrderRow = (row) => ({
  orderId: row.OrderID,
  customer: row.Customer,
  date: row.OrderDate,
  totalPrice: Number(row.TotalPrice),
  status: row.Status,
  paymentMethod: row.PaymentMethod,
  address: row.address || row.Address || null,
});

// ============================
// GET /api/admin/orders (list)
// ============================
router.get("/", async (req, res) => {
  try {
    const { status, q, page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const where = [];
    const params = [];

    if (status) {
      where.push("o.Status = ?");
      params.push(status);
    }
    if (q) {
      where.push(
        `(u.FirstName LIKE ? OR u.LastName LIKE ? OR CONCAT(u.FirstName,' ',u.LastName) LIKE ? OR o.OrderID = ?)`
      );
      params.push(`%${q}%`, `%${q}%`, `%${q}%`, Number.isFinite(Number(q)) ? Number(q) : -1);
    }
    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const [rows] = await db.query(
      `SELECT 
         o.OrderID,
         CONCAT(u.FirstName,' ',u.LastName) AS Customer,
         o.OrderDate,
         o.TotalPrice,
         o.Status,
         o.PaymentMethod,
         u.Address AS address
       FROM orders o
       JOIN users u ON o.UID = u.UID
       ${whereSql}
       ORDER BY o.OrderDate DESC
       LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    );

    const [[{ total }]] = await db.query(
      `SELECT COUNT(*) as total FROM orders o JOIN users u ON o.UID = u.UID ${whereSql}`,
      params
    );

    res.json({
      data: rows.map(mapOrderRow),
      page: Number(page),
      limit: Number(limit),
      total,
    });
  } catch (err) {
    console.error("GET /orders error", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// ==========================================
// GET /api/admin/orders/:id (details + items)
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [[order]] = await db.query(
      `SELECT 
         o.*,
         CONCAT(u.FirstName,' ',u.LastName) AS Customer,
         u.Email, u.Contact, u.Address AS address
       FROM orders o
       JOIN users u ON o.UID = u.UID
       WHERE o.OrderID = ?`,
      [id]
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    const [items] = await db.query(
      `SELECT oi.OrderItemID, p.Name AS ProductName, pv.Size, pv.Color, oi.Quantity, oi.Price, oi.VariantID
       FROM order_items oi
       JOIN products p ON oi.PID = p.PID
       JOIN product_variants pv ON oi.VariantID = pv.VariantID
       WHERE oi.OrderID = ?`,
      [id]
    );

    const [[payment]] = await db.query(
      `SELECT PaymentID, PaymentMethod, PaymentStatus, TransactionID, PaidAt
       FROM payments
       WHERE OrderID = ?
       ORDER BY PaidAt DESC
       LIMIT 1`,
      [id]
    );

    res.json({
      order: {
        orderId: order.OrderID,
        customer: order.Customer,
        email: order.Email,
        contact: order.Contact,
        address: order.address || order.Address || null,
        orderDate: order.OrderDate,
        totalPrice: Number(order.TotalPrice),
        status: order.Status,
        paymentMethod: order.PaymentMethod,
        discountAmount: Number(order.DiscountAmount || 0),
      },
      items: items.map((i) => ({
        orderItemId: i.OrderItemID,
        productName: i.ProductName,
        size: i.Size,
        color: i.Color,
        quantity: i.Quantity,
        price: Number(i.Price),
        lineTotal: Number(i.Price) * i.Quantity,
        variantId: i.VariantID,
      })),
      payment: payment || null,
    });
  } catch (err) {
    console.error("GET /orders/:id error", err);
    res.status(500).json({ message: "Failed to fetch order details" });
  }
});

router.patch("/:id/status", async (req, res) => {
  const conn = await db.getConnection();
  try {
    const { id } = req.params;
    const { status } = req.body || {};
    const allowed = ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"];
    if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid status" });

    await conn.beginTransaction();

    // Update order status
    const [result] = await conn.query(`UPDATE orders SET Status = ? WHERE OrderID = ?`, [status, id]);
    if (result.affectedRows === 0) {
      await conn.rollback();
      return res.status(404).json({ message: "Order not found" });
    }

    // If order marked Paid/Shipped/Delivered → reduce stock
    if (["Paid", "Shipped", "Delivered"].includes(status)) {
      const [items] = await conn.query(
        `SELECT VariantID, Quantity FROM order_items WHERE OrderID = ?`,
        [id]
      );

      for (const it of items) {
        await conn.query(
          `UPDATE product_variants 
           SET StockQuantity = StockQuantity - ? 
           WHERE VariantID = ? AND StockQuantity >= ?`,
          [it.Quantity, it.VariantID, it.Quantity]
        );
      }
    }

    await conn.commit();
    res.json({ message: "Status updated", orderId: Number(id), status });
  } catch (err) {
    await conn.rollback();
    console.error("PATCH /orders/:id/status error", err);
    res.status(500).json({ message: "Failed to update status" });
  } finally {
    conn.release();
  }
});



// Get tracking info for an order
router.get('/order/:orderId/tracking', async (req, res) => {
  const { orderId } = req.params;
  try {
    const [tracking] = await db.query(
      `SELECT * FROM order_tracking WHERE OrderID = ? ORDER BY UpdatedAt ASC`,
      [orderId]
    );
    res.json(tracking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tracking info' });
  }
});

// Add a new tracking step
router.post('/order/:orderId/tracking', async (req, res) => {
  const { orderId } = req.params;
  const { status, statusMessage, location } = req.body;
  try {
    await db.query(
      `INSERT INTO order_tracking (OrderID, Status, StatusMessage, Location) VALUES (?, ?, ?, ?)`,
      [orderId, status, statusMessage, location]
    );
    res.json({ message: 'Tracking step added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add tracking step' });
  }
});

// Optionally: Update a tracking step
router.put('/order/:orderId/tracking/:trackingId', async (req, res) => {
  const { orderId, trackingId } = req.params;
  const { status, statusMessage, location } = req.body;
  try {
    await db.query(
      `UPDATE order_tracking SET Status = ?, StatusMessage = ?, Location = ? WHERE TrackingID = ? AND OrderID = ?`,
      [status, statusMessage, location, trackingId, orderId]
    );
    res.json({ message: 'Tracking step updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update tracking step' });
  }
});

module.exports = router;
