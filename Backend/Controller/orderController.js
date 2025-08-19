// // // // controllers/orderController.js
// // // const db = require("../config/db"); // your db connection file

// // // // ✅ Create New Order
// // // exports.createOrder = (req, res) => {
// // //   const {
// // //     user_id,
// // //     total_amount,
// // //     payment_method,
// // //     shipping_address,
// // //     coupon_code,
// // //     discount,
// // //     final_amount,
// // //     status,
// // //   } = req.body;

// // //   const sql = `
// // //     INSERT INTO orders (user_id, total_amount, payment_method, shipping_address, coupon_code, discount, final_amount, status)
// // //     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
// // //   `;

// // //   db.query(
// // //     sql,
// // //     [
// // //       user_id,
// // //       total_amount,
// // //       payment_method,
// // //       shipping_address,
// // //       coupon_code || null,
// // //       discount || 0,
// // //       final_amount,
// // //       status || "Pending",
// // //     ],
// // //     (err, result) => {
// // //       if (err) return res.status(500).json({ error: err.message });
// // //       res.status(201).json({ message: "Order created successfully", order_id: result.insertId });
// // //     }
// // //   );
// // // };

// // // // ✅ Get All Orders
// // // exports.getAllOrders = (req, res) => {
// // //   const sql = "SELECT * FROM orders ORDER BY created_at DESC";
// // //   db.query(sql, (err, results) => {
// // //     if (err) return res.status(500).json({ error: err.message });
// // //     res.status(200).json(results);
// // //   });
// // // };

// // // // ✅ Get Single Order by ID
// // // exports.getOrderById = (req, res) => {
// // //   const { id } = req.params;
// // //   const sql = "SELECT * FROM orders WHERE order_id = ?";
// // //   db.query(sql, [id], (err, result) => {
// // //     if (err) return res.status(500).json({ error: err.message });
// // //     if (result.length === 0) return res.status(404).json({ message: "Order not found" });
// // //     res.status(200).json(result[0]);
// // //   });
// // // };

// // // // ✅ Update Order Status
// // // exports.updateOrderStatus = (req, res) => {
// // //   const { id } = req.params;
// // //   const { status } = req.body;

// // //   const sql = "UPDATE orders SET status = ? WHERE order_id = ?";
// // //   db.query(sql, [status, id], (err, result) => {
// // //     if (err) return res.status(500).json({ error: err.message });
// // //     if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });
// // //     res.status(200).json({ message: "Order status updated successfully" });
// // //   });
// // // };

// // // // ✅ Delete Order
// // // exports.deleteOrder = (req, res) => {
// // //   const { id } = req.params;
// // //   const sql = "DELETE FROM orders WHERE order_id = ?";
// // //   db.query(sql, [id], (err, result) => {
// // //     if (err) return res.status(500).json({ error: err.message });
// // //     if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });
// // //     res.status(200).json({ message: "Order deleted successfully" });
// // //   });
// // // };


// // // controllers/orderController.js
// // // const db = require("../config/db");

// // const db = require("../db");

// // // ✅ Create New Order (with items)
// // exports.createOrder = (req, res) => {
// //   const {
// //     user_id,
// //     total_amount,
// //     payment_method,
// //     shipping_address,
// //     coupon_code,
// //     discount,
// //     final_amount,
// //     status,
// //     items, // [{product_id, quantity, price}]
// //   } = req.body;

// //   if (!user_id || !total_amount || !final_amount || !items || items.length === 0) {
// //     return res.status(400).json({ error: "Missing required fields or empty cart" });
// //   }

// //   const sqlOrder = `
// //     INSERT INTO orders 
// //     (UID, total_amount, payment_method, shipping_address, coupon_code, discount, final_amount, status) 
// //     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
// //   `;

// //   db.query(
// //     sqlOrder,
// //     [
// //       user_id,
// //       total_amount,
// //       payment_method || "COD",
// //       shipping_address || "",
// //       coupon_code || null,
// //       discount || 0,
// //       final_amount,
// //       status || "Pending",
// //     ],
// //     (err, result) => {
// //       if (err) return res.status(500).json({ error: err.message });

// //       const orderId = result.insertId;

// //       // Insert order items
// //       const sqlItems = `
// //         INSERT INTO order_items (order_id, product_id, quantity, price)
// //         VALUES ?
// //       `;
// //       const values = items.map((item) => [orderId, item.product_id, item.quantity, item.price]);

// //       db.query(sqlItems, [values], (err2) => {
// //         if (err2) return res.status(500).json({ error: err2.message });

// //         res.status(201).json({
// //           message: "Order created successfully",
// //           order_id: orderId,
// //           items,
// //         });
// //       });
// //     }
// //   );
// // };

// // // ✅ Get All Orders (with items & user info)
// // exports.getAllOrders = (req, res) => {
// //   const sql = `
// //     SELECT o.*, u.name as user_name, u.email,
// //       JSON_ARRAYAGG(
// //         JSON_OBJECT(
// //           'product_id', oi.product_id,
// //           'quantity', oi.quantity,
// //           'price', oi.price
// //         )
// //       ) as items
// //     FROM orders o
// //     LEFT JOIN users u ON o.user_id = u.user_id
// //     LEFT JOIN order_items oi ON o.order_id = oi.order_id
// //     GROUP BY o.order_id
// //     ORDER BY o.created_at DESC
// //   `;

// //   db.query(sql, (err, results) => {
// //     if (err) return res.status(500).json({ error: err.message });
// //     res.status(200).json(results);
// //   });
// // };

// // // ✅ Get Single Order by ID (with items)
// // exports.getOrderById = (req, res) => {
// //   const { id } = req.params;

// //   const sql = `
// //     SELECT o.*, u.name as user_name, u.email,
// //       JSON_ARRAYAGG(
// //         JSON_OBJECT(
// //           'product_id', oi.product_id,
// //           'quantity', oi.quantity,
// //           'price', oi.price
// //         )
// //       ) as items
// //     FROM orders o
// //     LEFT JOIN users u ON o.user_id = u.user_id
// //     LEFT JOIN order_items oi ON o.order_id = oi.order_id
// //     WHERE o.order_id = ?
// //     GROUP BY o.order_id
// //   `;

// //   db.query(sql, [id], (err, results) => {
// //     if (err) return res.status(500).json({ error: err.message });
// //     if (results.length === 0) return res.status(404).json({ message: "Order not found" });
// //     res.status(200).json(results[0]);
// //   });
// // };

// // // ✅ Update Order Status
// // exports.updateOrderStatus = (req, res) => {
// //   const { id } = req.params;
// //   const { status } = req.body;

// //   if (!status) return res.status(400).json({ error: "Status is required" });

// //   const sql = "UPDATE orders SET status = ?, updated_at = NOW() WHERE order_id = ?";
// //   db.query(sql, [status, id], (err, result) => {
// //     if (err) return res.status(500).json({ error: err.message });
// //     if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });

// //     res.status(200).json({ message: "Order status updated successfully", order_id: id, status });
// //   });
// // };

// // // ✅ Delete Order (cascade delete items)
// // exports.deleteOrder = (req, res) => {
// //   const { id } = req.params;

// //   const sql = "DELETE FROM orders WHERE order_id = ?";
// //   db.query(sql, [id], (err, result) => {
// //     if (err) return res.status(500).json({ error: err.message });
// //     if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });

// //     res.status(200).json({ message: "Order deleted successfully", order_id: id });
// //   });
// // };

// // // module.exports = {
// // //   createOrder,
// // //   getAllOrders,
// // //   getOrderById,
// // //   updateOrderStatus,
// // //   deleteOrder
// // // };

// // Controller/orderController.js
// const db = require("../db");

// // ✅ Create a new order
// exports.createOrder = (req, res) => {
//   try {
//     // Assuming your authentication middleware sets req.user.UID
//     const userId = req.user?.UID; // logged-in user id
//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized: User not logged in" });
//     }

//     const {
//       TotalPrice,
//       Status = "Pending",
//       PaymentMethod,
//       ShippingAddress,
//       CouponID = null,
//       DiscountAmount = 0,
//     } = req.body;

//     if (!TotalPrice || !PaymentMethod || !ShippingAddress) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const sql = `
//       INSERT INTO orders 
//       (UID, OrderDate, TotalPrice, Status, PaymentMethod, ShippingAddress, CouponID, DiscountAmount)
//       VALUES (?, NOW(), ?, ?, ?, ?, ?, ?)
//     `;

//     db.query(
//       sql,
//       [userId, TotalPrice, Status, PaymentMethod, ShippingAddress, CouponID, DiscountAmount],
//       (err, result) => {
//         if (err) {
//           console.error("Error inserting order:", err);
//           return res.status(500).json({ message: "Error creating order" });
//         }
//         res.status(201).json({
//           message: "Order created successfully",
//           orderId: result.insertId,
//         });
//       }
//     );
//   } catch (error) {
//     console.error("Error in createOrder:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // ✅ Get all orders (Admin use case)
// exports.getAllOrders = (req, res) => {
//   const sql = "SELECT * FROM orders";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching orders:", err);
//       return res.status(500).json({ message: "Error fetching orders" });
//     }
//     res.json(results);
//   });
// };

// // ✅ Get a single order by ID
// exports.getOrderById = (req, res) => {
//   const orderId = req.params.id;
//   const sql = "SELECT * FROM orders WHERE OrderID = ?";
//   db.query(sql, [orderId], (err, results) => {
//     if (err) {
//       console.error("Error fetching order:", err);
//       return res.status(500).json({ message: "Error fetching order" });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     res.json(results[0]);
//   });
// };

// // ✅ Update order status
// exports.updateOrderStatus = (req, res) => {
//   const orderId = req.params.id;
//   const { Status } = req.body;

//   const sql = "UPDATE orders SET Status = ? WHERE OrderID = ?";
//   db.query(sql, [Status, orderId], (err, result) => {
//     if (err) {
//       console.error("Error updating order:", err);
//       return res.status(500).json({ message: "Error updating order" });
//     }
//     res.json({ message: "Order status updated successfully" });
//   });
// };

// // ✅ Delete order
// exports.deleteOrder = (req, res) => {
//   const orderId = req.params.id;

//   const sql = "DELETE FROM orders WHERE OrderID = ?";
//   db.query(sql, [orderId], (err, result) => {
//     if (err) {
//       console.error("Error deleting order:", err);
//       return res.status(500).json({ message: "Error deleting order" });
//     }
//     res.json({ message: "Order deleted successfully" });
//   });
// };


// Controller/orderController.js
const db = require("../db");

// ✅ Create New Order
exports.createOrder = (req, res) => {
  const {
    uid, // 👈 comes from frontend (localStorage.user.UID)
    total_amount,
    payment_method,
    shipping_address,
    coupon_code,
    discount,
    final_amount,
    status,
    items, // [{ product_id, quantity, price }]
  } = req.body;

  if (!uid || !total_amount || !final_amount || !items || items.length === 0) {
    return res.status(400).json({ error: "Missing required fields or empty cart" });
  }

  const sqlOrder = `
    INSERT INTO orders 
    (UID, total_amount, payment_method, shipping_address, coupon_code, discount, final_amount, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sqlOrder,
    [
      uid,
      total_amount,
      payment_method || "COD",
      shipping_address || "",
      coupon_code || null,
      discount || 0,
      final_amount,
      status || "Pending",
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      const orderId = result.insertId;

      // Insert order items
      const sqlItems = `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ?
      `;
      const values = items.map((item) => [orderId, item.product_id, item.quantity, item.price]);

      db.query(sqlItems, [values], (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });

        res.status(201).json({
          message: "Order created successfully",
          order_id: orderId,
          uid,
          items,
        });
      });
    }
  );
};

// ✅ Get All Orders of a User
exports.getAllOrders = (req, res) => {
  const { uid } = req.params;

  const sql = `
    SELECT o.*, 
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'product_id', oi.product_id,
          'quantity', oi.quantity,
          'price', oi.price
        )
      ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.UID = ?
    GROUP BY o.order_id
    ORDER BY o.created_at DESC
  `;

  db.query(sql, [uid], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// ✅ Get Order by ID
exports.getOrderById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT o.*, 
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'product_id', oi.product_id,
          'quantity', oi.quantity,
          'price', oi.price
        )
      ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.order_id = ?
    GROUP BY o.order_id
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(results[0]);
  });
};

// ✅ Update Order Status
exports.updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) return res.status(400).json({ error: "Status is required" });

  const sql = "UPDATE orders SET status = ?, updated_at = NOW() WHERE order_id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order status updated successfully", order_id: id, status });
  });
};

// ✅ Delete Order
exports.deleteOrder = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM orders WHERE order_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully", order_id: id });
  });
};
