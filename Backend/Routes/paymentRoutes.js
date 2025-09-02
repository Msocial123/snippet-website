// // const express = require("express");
// // const router = express.Router();
// // const db = require("../db"); // MySQL connection
// // const orderController = require('../Controller/orderController');

// // // Save payment details
// // router.post("/confirm", async (req, res) => {
// //   const { orderId, paymentId, transactionId, status } = req.body;

// //   if (!orderId || !paymentId || !transactionId || !status) {
// //     return res.status(400).json({ error: "Missing required fields" });
// //   }

// //   try {
// //     // 🔹 Get PaymentMethod from orders table
// //     const [orderResult] = await db.query(
// //       "SELECT PaymentMethod FROM orders WHERE OrderID = ?",
// //       [orderId]
// //     );

// //     if (orderResult.length === 0) {
// //       return res.status(404).json({ error: "Order not found" });
// //     }

// //     const paymentMethod = orderResult[0].PaymentMethod;

// //     // 🔹 Insert into Payments table
// //     await db.query(
// //       `INSERT INTO payments 
// //         (OrderID, PaymentMethod, PaymentStatus, TransactionID, PaidAt) 
// //        VALUES (?, ?, ?, ?, NOW())`,
// //       [orderId, paymentMethod, status, transactionId]
// //     );

// //     // 🔹 Update payment status if completed
// //     if (status.toLowerCase() === "completed") {
// //       await db.query(
// //         "UPDATE payments SET PaymentStatus = 'Completed' WHERE OrderID = ?",
// //         [orderId]
// //       );
// //     }

// //     res.json({ message: "✅ Payment saved successfully" });
// //   } catch (error) {
// //     console.error("❌ Error saving payment:", error);
// //     res.status(500).json({ error: "Failed to save payment" });
// //   }
// // });

// // router.put("/:orderId", orderController.updatePayment);

// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const db = require("../db"); // MySQL connection
// const orderController = require('../Controller/orderController');

// // Get all payments or filtered by status
// router.get("/", async (req, res) => {
//   const { status } = req.query; // status can be all, completed, pending, failed

//   try {
//     let query = `
//       SELECT 
//         p.PaymentID, 
//         p.OrderID, 
//         p.PaymentMethod, 
//         p.PaymentStatus, 
//         p.TransactionID, 
//         p.PaidAt,
//         o.TotalPrice AS amount
//       FROM payments p
//       JOIN orders o ON p.OrderID = o.OrderID
//     `;
//     let params = [];

//     if (status && status.toLowerCase() !== "all") {
//       query += " WHERE p.PaymentStatus = ?";
//       params.push(status.charAt(0).toUpperCase() + status.slice(1));
//     }

//     const [payments] = await db.query(query, params);

//     // Map DB columns to frontend-friendly camelCase
//     const mappedPayments = payments.map((p) => ({
//       paymentId: p.PaymentID,
//       orderId: p.OrderID,
//       paymentMethod: p.PaymentMethod,
//       paymentStatus: p.PaymentStatus,
//       transactionId: p.TransactionID,
//       paidAt: p.PaidAt,
//       amount: p.amount,
//     }));

//     res.json(mappedPayments);
//   } catch (error) {
//     console.error("❌ Error fetching payments:", error);
//     res.status(500).json({ error: "Failed to fetch payments" });
//   }
// });

// // Save payment details
// router.post("/confirm", async (req, res) => {
//   const { orderId, paymentId, transactionId, status } = req.body;

//   if (!orderId || !paymentId || !transactionId || !status) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     // 🔹 Get PaymentMethod from orders table
//     const [orderResult] = await db.query(
//       "SELECT PaymentMethod FROM orders WHERE OrderID = ?",
//       [orderId]
//     );

//     if (orderResult.length === 0) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     const paymentMethod = orderResult[0].PaymentMethod;

//     // 🔹 Insert into Payments table
//     await db.query(
//       `INSERT INTO payments 
//         (OrderID, PaymentMethod, PaymentStatus, TransactionID, PaidAt) 
//        VALUES (?, ?, ?, ?, NOW())`,
//       [orderId, paymentMethod, status, transactionId]
//     );

//     // 🔹 Update payment status if completed
//     if (status.toLowerCase() === "completed") {
//       await db.query(
//         "UPDATE payments SET PaymentStatus = 'Completed' WHERE OrderID = ?",
//         [orderId]
//       );
//     }

//     res.json({ message: "✅ Payment saved successfully" });
//   } catch (error) {
//     console.error("❌ Error saving payment:", error);
//     res.status(500).json({ error: "Failed to save payment" });
//   }
// });

// // Update payment status
// router.put("/:orderId", orderController.updatePayment);

// module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../db"); // MySQL connection
const orderController = require("../Controller/orderController");

// Get all payments or filtered by status
router.get("/", async (req, res) => {
  const { status } = req.query; // status can be all, completed, pending, failed

  try {
    let query = `
      SELECT 
        p.PaymentID, 
        p.OrderID, 
        p.PaymentMethod, 
        p.PaymentStatus, 
        p.TransactionID, 
        p.PaidAt,
        o.TotalPrice AS amount
      FROM payments p
      JOIN orders o ON p.OrderID = o.OrderID
    `;
    let params = [];

    if (status && status.toLowerCase() !== "all") {
      query += " WHERE p.PaymentStatus = ?";
      params.push(status.charAt(0).toUpperCase() + status.slice(1));
    }

    const [payments] = await db.query(query, params);

    const mappedPayments = payments.map((p) => ({
      paymentId: p.PaymentID,
      orderId: p.OrderID,
      paymentMethod: p.PaymentMethod,
      paymentStatus: p.PaymentStatus,
      transactionId: p.TransactionID,
      paidAt: p.PaidAt,
      amount: p.amount,
    }));

    res.json(mappedPayments);
  } catch (error) {
    console.error("❌ Error fetching payments:", error);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

// Save payment details
router.post("/confirm", async (req, res) => {
  const { orderId, paymentId, transactionId, status, paymentMethod } = req.body;

  if (!orderId || !paymentId || !transactionId || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let finalPaymentMethod = paymentMethod;

    // If paymentMethod is not provided, fallback to orders table
    if (!finalPaymentMethod) {
      const [orderResult] = await db.query(
        "SELECT PaymentMethod FROM orders WHERE OrderID = ?",
        [orderId]
      );

      if (orderResult.length === 0) {
        return res.status(404).json({ error: "Order not found" });
      }

      finalPaymentMethod = orderResult[0].PaymentMethod || "Unknown";
    }

    // Insert into Payments table
    await db.query(
      `INSERT INTO payments 
        (OrderID, PaymentMethod, PaymentStatus, TransactionID, PaidAt) 
       VALUES (?, ?, ?, ?, NOW())`,
      [orderId, finalPaymentMethod, status, transactionId]
    );

    // Update payment status if completed
    if (status.toLowerCase() === "completed") {
      await db.query(
        "UPDATE payments SET PaymentStatus = 'Completed' WHERE OrderID = ?",
        [orderId]
      );
    }

    res.json({ message: "✅ Payment saved successfully" });
  } catch (error) {
    console.error("❌ Error saving payment:", error);
    res.status(500).json({ error: "Failed to save payment" });
  }
});

// Update payment status
router.put("/:orderId", orderController.updatePayment);

module.exports = router;
