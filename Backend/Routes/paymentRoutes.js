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


router.post("/confirm", async (req, res) => {
  // const { orderId, paymentId, transactionId, status, paymentMethod } = req.body;

  // console.log("Received payment confirm:", req.body);

  // if (!orderId || !paymentId || !transactionId || !status) {
  //   console.log("Missing required fields");
  //   return res.status(400).json({ error: "Missing required fields" });
  // }

  const { orderId, paymentId, transactionId, status, paymentMethod } = req.body;

  console.log("Received payment confirm:", req.body);

  // Validate mandatory fields except paymentId/transactionId for COD with Pending status
  if (!orderId || !paymentMethod || !status) {
    console.log("Missing required fields");
    return res.status(400).json({ error: "Missing required fields" });
  }

  // COD + Pending status → allow empty paymentId and transactionId
  if (!(paymentMethod === "COD" && status === "Pending")) {
    if (!paymentId || !transactionId) {
      console.log("Missing required fields for non-COD or completed payment");
      return res.status(400).json({ error: "Missing required fields" });
    }
  }
  try {
    // 1. Get UID and ordered variant IDs from order
    const [orderRows] = await db.query(
      "SELECT UID FROM orders WHERE OrderID = ?",
      [orderId]
    );

    if (orderRows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    const userId = orderRows[0].UID;

    const [orderItems] = await db.query(
      "SELECT VariantID FROM order_items WHERE OrderID = ?",
      [orderId]
    );

    const variantIds = orderItems.map(item => item.VariantID);

   

    // Insert payment record
await db.query(
  `INSERT INTO payments (OrderID, PaymentMethod, PaymentStatus, TransactionID, PaidAt) 
   VALUES (?, ?, ?, ?, NOW())`,
  [orderId, paymentMethod, status, transactionId]
);

if (paymentMethod === "COD") {
  if (variantIds.length > 0) {
    await db.query(
      "DELETE FROM cart WHERE UID = ? AND VariantID IN (?)",
      [userId, variantIds]
    );
  }
}

// Update only for completed payments
if (status.toLowerCase() === "completed") {
  await db.query(
    "UPDATE payments SET PaymentStatus = 'Completed' WHERE OrderID = ?",
    [orderId]
  );

  await db.query(
    "UPDATE orders SET Status = 'Paid', PaymentMethod = ? WHERE OrderID = ?",
    [paymentMethod, orderId]
  );

  if (variantIds.length > 0) {
    await db.query(
      "DELETE FROM cart WHERE UID = ? AND VariantID IN (?)",
      [userId, variantIds]
    );
  }
 } else if (paymentMethod === "COD" && status.toLowerCase() === "pending") {
  // For COD with Pending status, update orders accordingly
  await db.query(
    "UPDATE orders SET Status = 'Pending', PaymentMethod = ? WHERE OrderID = ?",
    [paymentMethod, orderId]
  );
}

    console.log("Payment record inserted and cart updated successfully");

    res.json({ message: "✅ Payment saved and cart cleared successfully" });
  } catch (error) {
    console.error("❌ Error saving payment and clearing cart:", error);
    res.status(500).json({ error: "Failed to save payment and update cart" });
  }
});



// Update payment status
router.put("/:orderId", orderController.updatePayment);

module.exports = router;
