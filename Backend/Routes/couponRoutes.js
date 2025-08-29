// Routes/couponRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/validate", async (req, res) => {
  const { code, total } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM coupons WHERE Code = ? AND ExpiryDate >= CURDATE() AND UsageLimit > TimesUsed",
      [code]
    );

    if (rows.length === 0) {
      return res.json({ valid: false, message: "Invalid or expired coupon" });
    }

    const coupon = rows[0];
    let discountAmount = 0;

    if (coupon.Code === "FREESHIP") {
      discountAmount = 49; // flat shipping
    } else {
      discountAmount = (total * coupon.DiscountPercent) / 100;
    }

    res.json({
      valid: true,
      message: `Coupon ${code} applied!`,
      discountAmount,
      couponId: coupon.CouponID,
    });
  } catch (err) {
    console.error("❌ Coupon validate error:", err);
    res.status(500).json({ valid: false, message: "Server error" });
  }
});

module.exports = router;