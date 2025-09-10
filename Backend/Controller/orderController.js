const db = require("../db");


// Create Order
exports.createOrder = async (req, res) => {
  const { uid, TotalPrice, PaymentMethod, ShippingAddress, CouponCode, items, phone } = req.body;

  if (!uid || !TotalPrice || !PaymentMethod || !ShippingAddress || !items || items.length === 0) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // 🔹 Step 1: Update phone + address in users table
    await connection.query(
      `UPDATE users SET Contact = ?, Address = ? WHERE UID = ?`,
      [phone, ShippingAddress, uid]
    );

    let couponId = null;
    let discountAmount = 0;

    // Coupon logic same as before...
    if (CouponCode) {
      const [couponRows] = await connection.query(
        `SELECT * FROM coupons 
         WHERE Code = ? 
         AND ExpiryDate >= CURDATE() 
         AND UsageLimit > TimesUsed`,
        [CouponCode]
      );

      if (couponRows.length > 0) {
        const coupon = couponRows[0];
        couponId = coupon.CouponID;

        if (coupon.Code === "FREESHIP") {
          discountAmount = 49;
        } else {
          discountAmount = (TotalPrice * coupon.DiscountPercent) / 100;
        }

        await connection.query(
          "UPDATE coupons SET TimesUsed = TimesUsed + 1 WHERE CouponID = ?",
          [couponId]
        );
      }
    }

    // 🔹 Step 2: Save order
    const [orderResult] = await connection.query(
      `INSERT INTO orders (UID, OrderDate, TotalPrice, Status, PaymentMethod, ShippingAddress, CouponID, DiscountAmount)
       VALUES (?, NOW(), ?, 'Pending', ?, ?, ?, ?)`,
      [uid, TotalPrice, PaymentMethod, ShippingAddress, couponId, discountAmount]
    );

    const orderId = orderResult.insertId;

    if (couponId) {
      await connection.query(
        `INSERT INTO coupon_usages (CouponID, UID, OrderID, AppliedAt) 
         VALUES (?, ?, ?, NOW())`,
        [couponId, uid, orderId]
      );
    }

    for (const item of items) {
      await connection.query(
        `INSERT INTO order_items (OrderID, PID, VariantID, Quantity, Price)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.productId, item.variantId || null, item.quantity, item.price]
      );
    }

    // await connection.query(
    //   `INSERT INTO payments (OrderID, PaymentMethod, PaymentStatus, TransactionID, PaidAt)
    //    VALUES (?, ?, 'Pending', '', NOW())`,
    //   [orderId, PaymentMethod]
    // );

    await connection.commit();

    res.status(201).json({
      message: "Order created successfully",
      orderId,
      orderNumber: `ORD-${orderId}`,
      appliedCoupon: CouponCode || null,
      discountAmount,
      totalAmount: TotalPrice - discountAmount   // 🔹 send final amount
    });
  } catch (err) {
    await connection.rollback();
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Failed to create order" });
  } finally {
    connection.release();
  }
};

// Get all orders for a specific user
exports.getAllOrders = async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Include user info and DiscountAmount + CouponCode
    const [orders] = await db.query(
      `SELECT o.*, 
        c.Code as CouponCode,
        c.DiscountPercent,
        o.DiscountAmount,
        (o.TotalPrice - o.DiscountAmount) AS FinalAmount, 
        u.FirstName,
        u.LastName,
        u.Email,
        u.Contact,
        u.Address,
        IFNULL(JSON_ARRAYAGG(
          JSON_OBJECT(
            'product_id', oi.PID,
            'variant_id', oi.VariantID,
            'quantity', oi.Quantity,
            'price', oi.Price
          )
        ), JSON_ARRAY()) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.OrderID = oi.OrderID
      LEFT JOIN coupons c ON o.CouponID = c.CouponID
      LEFT JOIN users u ON o.UID = u.UID
      WHERE o.UID = ?
      GROUP BY o.OrderID
      ORDER BY o.OrderDate DESC`,
      [uid]
    );

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const [orderDetails] = await db.query(
      `SELECT 
  o.*,
  ANY_VALUE(c.Code) as CouponCode,     
  ANY_VALUE(c.DiscountPercent) as DiscountPercent,
  ANY_VALUE(o.DiscountAmount) as DiscountAmount,
  (o.TotalPrice - o.DiscountAmount) AS FinalAmount,
  ANY_VALUE(p.PaymentStatus) as PaymentStatus,
  ANY_VALUE(p.TransactionID) as TransactionID,
  ANY_VALUE(u.FirstName) as FirstName,
  ANY_VALUE(u.LastName) as LastName,
  ANY_VALUE(u.Email) as Email,
  ANY_VALUE(u.Contact) as Contact,
  ANY_VALUE(u.Address) as Address,
  JSON_ARRAYAGG(
    JSON_OBJECT(
      'item_id', oi.OrderItemID,  
      'product_id', oi.PID,
      'variant_id', oi.VariantID,      
      'quantity', oi.Quantity,
      'price', oi.Price,
      'product_name', pr.Name,
      'color', pv.Color,
      'size', pv.Size,
      'image', COALESCE(pv.VariantImage, JSON_UNQUOTE(JSON_EXTRACT(pd.Images, '$[0]')))
    )
  ) as items
FROM orders o
LEFT JOIN (
   SELECT DISTINCT OrderItemID, OrderID, PID, VariantID, Quantity, Price
   FROM order_items
) oi ON o.OrderID = oi.OrderID
LEFT JOIN coupons c ON o.CouponID = c.CouponID
LEFT JOIN (
   SELECT OrderID, MAX(PaymentStatus) as PaymentStatus, MAX(TransactionID) as TransactionID
   FROM payments
   GROUP BY OrderID
) p ON o.OrderID = p.OrderID
LEFT JOIN users u ON o.UID = u.UID
LEFT JOIN products pr ON oi.PID = pr.PID
LEFT JOIN product_variants pv ON oi.VariantID = pv.VariantID
LEFT JOIN product_details pd ON pr.PID = pd.PID
WHERE o.OrderID = ?
GROUP BY o.OrderID;
`,
      [orderId]
    );

    if (orderDetails.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(orderDetails[0]);
  } catch (err) {
    console.error("Error fetching order details:", err);
    res.status(500).json({ error: "Failed to fetch order details" });
  }
};

exports.deleteOrderItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    // 1. Get item details
    const [itemResult] = await db.query(
      "SELECT OrderID, Quantity, Price FROM order_items WHERE OrderItemID = ?",
      [itemId]
    );

    if (!itemResult.length) {
      return res.status(404).json({ message: "Item not found" });
    }

    const item = itemResult[0];
    const orderId = item.OrderID;
    const itemTotal = item.Quantity * item.Price;

    // 2. Delete the item
    await db.query("DELETE FROM order_items WHERE OrderItemID = ?", [itemId]);

    // 3. Get remaining items for the order
    const [remainingItems] = await db.query(
      "SELECT Quantity, Price FROM order_items WHERE OrderID = ?",
      [orderId]
    );

    // 4. Recalculate total price
    let newTotal = remainingItems.reduce(
      (sum, i) => sum + i.Quantity * i.Price,
      0
    );

    // 5. Get current order info for coupon discount
    const [orderResult] = await db.query(
      "SELECT CouponID FROM orders WHERE OrderID = ?",
      [orderId]
    );

    let discountAmount = 0;
    const couponCode = orderResult[0]?.CouponCode;

    // Apply coupon discount logic if needed
    if (couponCode) {
      // Simple example: assume discount is 10% for any coupon
      discountAmount = newTotal * 0.1;
      newTotal = newTotal - discountAmount;
    }

    // 6. Update order totals in the database
    await db.query(
      "UPDATE orders SET TotalPrice = ?, DiscountAmount = ? WHERE OrderID = ?",
      [newTotal, discountAmount, orderId]
    );

    res.json({
      message: "Item deleted and order totals updated",
      newTotal,
      discountAmount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update payment method & confirm payment
exports.updatePayment = async (req, res) => {
  const { orderId } = req.params;
  const { paymentMethod, paymentStatus, transactionId } = req.body;

  if (!orderId || !paymentMethod) {
    return res.status(400).json({ error: "Order ID and payment method required" });
  }

  try {
    // 🔹 Update order table
    await db.query(
      ` UPDATE orders SET Status = 'Paid', PaymentMethod = ? WHERE OrderID = ?`,
      [paymentMethod, orderId]
    );

    // 🔹 Update payments table
    await db.query(
      `UPDATE payments 
       SET PaymentMethod = ?, PaymentStatus = ?, TransactionID = ?, PaidAt = NOW()
       WHERE OrderID = ?`,
      [paymentMethod, paymentStatus || "Pending", transactionId || "", orderId]
    );

    res.status(200).json({
      message: "Payment updated successfully",
      orderId,
      paymentMethod,
      paymentStatus: paymentStatus || "Pending",
    });
  } catch (err) {
    console.error("Error updating payment:", err);
    res.status(500).json({ error: "Failed to update payment" });
  }
};
