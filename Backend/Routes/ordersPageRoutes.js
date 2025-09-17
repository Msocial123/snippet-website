// const express = require('express');
// const router = express.Router();
// const db = require('../db'); // Your MySQL connection

// // GET /api/orders/user/:uid
// router.get('/user/:uid', async (req, res) => {
//   const { uid } = req.params;
//   try {
//     // Get all orders for the user
//     const [orders] = await db.query(
//       `SELECT * FROM orders WHERE UID = ? ORDER BY OrderDate DESC`, [uid]
//     );

//     if (!orders.length) return res.json([]);

//     // Get all order IDs
//     const orderIds = orders.map(o => o.OrderID);

//     // Get all items for these orders, joining product, variant
//     const [items] = await db.query(
//       `SELECT 
//         oi.OrderID,
//         oi.OrderItemID,
//         oi.PID,
//         oi.VariantID as variant_id,
//         oi.Quantity as quantity,
//         oi.Price as price,
//         p.Name as name,
//         v.Size as size,
//         v.Color as color,
//         v.VariantImage as image
//       FROM order_items oi
//       JOIN products p ON oi.PID = p.PID
//       JOIN product_variants v ON oi.VariantID = v.VariantID
//       WHERE oi.OrderID IN (?)
//       ORDER BY oi.OrderID DESC`, [orderIds]
//     );

//     // Group items by order
//     const orderMap = {};
//     orders.forEach(order => {
//       order.items = [];
//       orderMap[order.OrderID] = order;
//     });
//     items.forEach(item => {
//       if (orderMap[item.OrderID]) orderMap[item.OrderID].items.push(item);
//     });

//     res.json(orders);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// });

// // 🟡 POST /api/orders/cancel/:orderId - cancel (delete) an order
// router.post('/cancel/:orderId', async (req, res) => {
//   const { orderId } = req.params;
//   const { reason } = req.body;

//   if (!reason || !reason.trim()) {
//     return res.status(400).json({ error: 'Cancellation reason is required' });
//   }

//   const connection = await db.getConnection();
//   try {
//     await connection.beginTransaction();

//     // Store cancellation reason
//     await connection.query(
//       `INSERT INTO order_cancellations (OrderID, Reason, CancelledAt)
//        VALUES (?, ?, NOW())`,
//       [orderId, reason]
//     );

//     // Delete all order items
//     await connection.query('DELETE FROM order_items WHERE OrderID = ?', [orderId]);

//     // Delete the order
//     await connection.query('DELETE FROM orders WHERE OrderID = ?', [orderId]);

//     await connection.commit();
//     res.json({ message: 'Order cancelled successfully' });
//   } catch (err) {
//     await connection.rollback();
//     console.error("Error cancelling order:", err);
//     res.status(500).json({ error: 'Failed to cancel order' });
//   } finally {
//     connection.release();
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../db'); // Your MySQL connection

// =====================
// GET all orders for a user
// =====================
router.get('/user/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    const [orders] = await db.query(
      `SELECT * FROM orders WHERE UID = ? ORDER BY OrderDate DESC`,
      [uid]
    );

    if (!orders.length) return res.json([]);

    const orderIds = orders.map(o => o.OrderID);

    const [items] = await db.query(
      `SELECT 
        oi.OrderID,
        oi.OrderItemID,
        oi.PID,
        oi.VariantID as variant_id,
        oi.Quantity as quantity,
        oi.Price as price,
        p.Name as name,
        v.Size as size,
        v.Color as color,
        v.VariantImage as image
      FROM order_items oi
      JOIN products p ON oi.PID = p.PID
      JOIN product_variants v ON oi.VariantID = v.VariantID
      WHERE oi.OrderID IN (?)
      ORDER BY oi.OrderID DESC`,
      [orderIds]
    );

    const orderMap = {};
    orders.forEach(order => {
      order.items = [];
      orderMap[order.OrderID] = order;
    });
    items.forEach(item => {
      if (orderMap[item.OrderID]) orderMap[item.OrderID].items.push(item);
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// =====================
// POST cancel an order
// =====================
router.post('/cancel/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { reason } = req.body;

  if (!reason || !reason.trim()) {
    return res.status(400).json({ error: 'Cancellation reason is required' });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      `INSERT INTO order_cancellations (OrderID, Reason, CancelledAt)
       VALUES (?, ?, NOW())`,
      [orderId, reason]
    );

    await connection.query('DELETE FROM order_items WHERE OrderID = ?', [orderId]);
    await connection.query('DELETE FROM orders WHERE OrderID = ?', [orderId]);

    await connection.commit();
    res.json({ message: 'Order cancelled successfully' });
  } catch (err) {
    await connection.rollback();
    console.error("Error cancelling order:", err);
    res.status(500).json({ error: 'Failed to cancel order' });
  } finally {
    connection.release();
  }
});

// =====================
// GET track order
router.get("/:orderId/tracking", async (req, res) => {
  const { orderId } = req.params;

  try {
    // Try order_tracking table first
    const [tracking] = await db.query(
      `SELECT TrackingID, Status, StatusMessage, Location, UpdatedAt
       FROM order_tracking
       WHERE OrderID = ?
       ORDER BY UpdatedAt ASC`,
      [orderId]
    );

    if (tracking.length) return res.json(tracking);

    // Fallback: get status from orders table
    const [orderRows] = await db.query(
      `SELECT OrderDate, ShippedDate, DeliveredDate, EstimatedDeliveryDate, Status, TrackingNumber, CourierService, ShippingAddress
       FROM orders WHERE OrderID = ?`,
      [orderId]
    );
    if (!orderRows.length) return res.status(404).json({ message: "Order not found" });

    const order = orderRows[0];
    // Build fallback tracking steps
    const fallback = [
      {
        Status: "Order Placed",
        StatusMessage: "Your order has been placed.",
        Location: order.ShippingAddress,
        UpdatedAt: order.OrderDate,
      },
      order.ShippedDate && {
        Status: "Shipped",
        StatusMessage: `Shipped via ${order.CourierService || "Courier"} (${order.TrackingNumber || "N/A"})`,
        Location: order.ShippingAddress,
        UpdatedAt: order.ShippedDate,
      },
      order.DeliveredDate && {
        Status: "Delivered",
        StatusMessage: "Order delivered.",
        Location: order.ShippingAddress,
        UpdatedAt: order.DeliveredDate,
      },
      order.EstimatedDeliveryDate && {
        Status: "Estimated Delivery",
        StatusMessage: "Estimated delivery date.",
        Location: order.ShippingAddress,
        UpdatedAt: order.EstimatedDeliveryDate,
      }
    ].filter(Boolean);

    res.json(fallback);
  } catch (err) {
    console.error("Error fetching tracking:", err);
    res.status(500).json({ error: "Failed to fetch tracking info" });
  }
});

module.exports = router;
