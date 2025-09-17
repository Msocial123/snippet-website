const db = require("../db");

exports.createOrder = async (req, res) => {
  const { uid, TotalPrice, PaymentMethod, ShippingAddress, CouponCode, items, phone } = req.body;

  if (!uid || !TotalPrice || !PaymentMethod || !ShippingAddress || !items || items.length === 0) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Step 1: Update phone + address
    await connection.query(
      `UPDATE users SET Contact = ?, Address = ? WHERE UID = ?`,
      [phone, ShippingAddress, uid]
    );

    // Step 2: Handle coupon logic
    let couponId = null;
    let discountAmount = 0;

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

    // Step 3: Insert order
    const [orderResult] = await connection.query(
      `INSERT INTO orders 
        (UID, OrderDate, TotalPrice, Status, PaymentMethod, ShippingAddress, CouponID, DiscountAmount)
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

    // Step 4: Insert order items & reduce stock
    for (const item of items) {
      await connection.query(
        `INSERT INTO order_items (OrderID, PID, VariantID, Quantity, Price)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.productId, item.variantId || null, item.quantity, item.price]
      );

      // Reduce stock for each variant (if variantId is present)
      if (item.variantId) {
        // Debug log
        console.log(`Reducing stock for VariantID=${item.variantId}, Quantity=${item.quantity}`);
        const [result] = await connection.query(
          `UPDATE product_variants 
           SET StockQuantity = StockQuantity - ? 
           WHERE VariantID = ? AND StockQuantity >= ?`,
          [item.quantity, item.variantId, item.quantity]
        );
        if (result.affectedRows === 0) {
          await connection.rollback();
          return res.status(400).json({ error: `Insufficient stock for variant ${item.variantId}` });
        }
      } else {
        // If no variantId, optionally reduce stock for the product (not recommended for fashion)
        console.warn(`No variantId for item:`, item);
      }
    }

    // Step 5: Commit transaction FIRST
    await connection.commit();

    // Step 6: Now create notifications OUTSIDE transaction
    await db.query(
      "INSERT INTO notifications (UID, Title, Message, Type) VALUES (?, ?, ?, ?)",
      [uid, "Order Placed", `Your order #${orderId} has been placed successfully!`, "order"]
    );

    await db.query(
      "INSERT INTO notifications (UID, Title, Message, Type) VALUES (?, ?, ?, ?)",
      [uid, "Order Shipped", `Your order #${orderId} has been shipped!`, "shipping"]
    );

    await db.query(
      "INSERT INTO notifications (UID, Title, Message, Type) VALUES (?, ?, ?, ?)",
      [uid, "Order Delivered", `Your order #${orderId} has been delivered!`, "delivered"]
    );

    await db.query(
      "INSERT INTO notifications (UID, Title, Message, Type) VALUES (?, ?, ?, ?)",
      [uid, "Special Offer!", "Get 20% off on your next purchase. Use code SAVE20.", "offer"]
    );

    await db.query(
      "INSERT INTO notifications (UID, Title, Message, Type) VALUES (?, ?, ?, ?)",
      [uid, "Voucher Unlocked!", "You have received a ₹100 voucher. Use it before it expires!", "voucher"]
    );

    res.status(201).json({
      message: "Order created successfully",
      orderId,
      orderNumber: `ORD-${orderId}`,
      appliedCoupon: CouponCode || null,
      discountAmount,
      totalAmount: TotalPrice - discountAmount
    });

  } catch (err) {
    await connection.rollback();
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Failed to create order" });
  } finally {
    connection.release();
  }
};


// ===============================
// 📌 Get all orders for a user
// ===============================
exports.getAllOrders = async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
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

    const conn = await db.getConnection();

    // 1️⃣ Fetch main order info (order + user + first address + coupon + payment)
    const [orderRows] = await conn.query(`
  SELECT 
    o.OrderID,
    o.UID,
    o.OrderDate,
    o.Status,
    o.TotalPrice,
    o.DiscountAmount,
    (o.TotalPrice - o.DiscountAmount) AS FinalAmount,
    
    -- Coupon Info
    c.Code AS CouponCode,
    c.DiscountPercent AS DiscountPercent,

    -- Payment Info
    p.PaymentStatus AS PaymentStatus,
    p.TransactionID AS TransactionID,
    p.PaymentMethod AS PaymentMethod,

    -- User Info
    u.FirstName,
    u.LastName,
    u.Email,
    -- fetch phone from addresses table, alias as Contact
    a.Phone AS Contact,  

    -- Normal Address (first address only)
    a.Address,
    a.City,
    a.State,
    a.Pincode
  FROM orders o
  LEFT JOIN users u ON o.UID = u.UID
  LEFT JOIN addresses a ON u.UID = a.UID
  LEFT JOIN coupons c ON o.CouponID = c.CouponID
  LEFT JOIN payments p ON o.OrderID = p.OrderID
  WHERE o.OrderID = ?
  LIMIT 1
`, [orderId]);


    if (orderRows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    const order = orderRows[0];

    // 2️⃣ Fetch order items separately to avoid duplicates
    const [itemsRows] = await conn.query(`
      SELECT 
        oi.OrderItemID AS item_id,
        oi.PID AS product_id,
        oi.VariantID AS variant_id,
        oi.Quantity AS quantity,
        oi.Price AS price,
        pr.Name AS product_name,
        pv.Color AS color,
        pv.Size AS size,
        CONCAT('uploads/', REPLACE(COALESCE(pv.VariantImage, JSON_UNQUOTE(JSON_EXTRACT(pd.Images,'$[0]'))), 'uploads/', '')) AS image
      FROM order_items oi
      LEFT JOIN products pr ON oi.PID = pr.PID
      LEFT JOIN product_variants pv ON oi.VariantID = pv.VariantID
      LEFT JOIN product_details pd ON pr.PID = pd.PID
      WHERE oi.OrderID = ?
    `, [orderId]);

    // 3️⃣ Combine order + items
    const fullOrder = { ...order, items: itemsRows };

    res.status(200).json(fullOrder);

  } catch (err) {
    console.error("Error fetching order details:", err);
    res.status(500).json({ error: "Failed to fetch order details" });
  }
};








// ===============================
// 📌 Delete order item
// ===============================

exports.deleteOrderItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const [itemResult] = await db.query(
      "SELECT OrderID, Quantity, Price FROM order_items WHERE OrderItemID = ?",
      [itemId]
    );

    if (!itemResult.length) {
      return res.status(404).json({ message: "Item not found" });
    }

    const item = itemResult[0];
    const orderId = item.OrderID;

    await db.query("DELETE FROM order_items WHERE OrderItemID = ?", [itemId]);

    const [remainingItems] = await db.query(
      "SELECT Quantity, Price FROM order_items WHERE OrderID = ?",
      [orderId]
    );

    let newTotal = remainingItems.reduce(
      (sum, i) => sum + i.Quantity * i.Price,
      0
    );

    await db.query(
      "UPDATE orders SET TotalPrice = ? WHERE OrderID = ?",
      [newTotal, orderId]
    );

    res.json({ message: "Item deleted and order totals updated", newTotal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// 📌 Update payment
// ===============================
exports.updatePayment = async (req, res) => {
  const { orderId } = req.params;
  const { paymentMethod, paymentStatus, transactionId } = req.body;

  if (!orderId || !paymentMethod) {
    return res.status(400).json({ error: "Order ID and payment method required" });
  }

  try {
    await db.query(
      `UPDATE orders SET Status = 'Paid', PaymentMethod = ? WHERE OrderID = ?`,
      [paymentMethod, orderId]
    );

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
