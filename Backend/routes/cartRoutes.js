// const express = require("express");
// const router = express.Router();
// const db = require("../db"); // adjust if path is different
// const cartController = require("../Controller/cartController");
// const {
//   getVariantByAttributes,
//   getVariantsByProductId,
// } = require('../Controller/variantController');

// // Controller logic directly in route
// // POST /api/cart

// router.post("/", cartController.addToCart);


// //to get cart items
// router.get("/:uid", async (req, res) => {
//   const uid = req.params.uid;

//   try {
//     const [rows] = await db.query(
//        `SELECT 
//       c.CartID, c.UID, c.PID, c.VariantID, c.Quantity,
//       p.Name, p.Price,
//       v.Color, v.Size,
//       v.VariantImage AS image   -- ← live, per-variant image
//    FROM cart c
//    JOIN products p ON c.PID = p.PID
//    JOIN product_variants v ON c.VariantID = v.VariantID
//    WHERE c.UID = ?`,
//       [uid]
//     );

//     //for updating and deleting products
//     router.patch("/update-quantity", cartController.updateCartQuantity);
//     router.delete("/delete/:uid/:variantId", cartController.deleteCartItem);

//     res.status(200).json(rows);
//   } catch (err) {
//     console.error("❌ Error fetching cart:", err);
//     res.status(500).json({ message: "Failed to fetch cart items" });
//   }
// });

// // ✅ Update quantity
// router.patch("/update-quantity", cartController.updateCartQuantity);

// // ✅ Delete item
// router.delete("/delete/:uid/:variantId", cartController.deleteCartItem);

// // ✅ Clear all items (if needed)
// router.delete("/clear/:uid", cartController.clearCart);

// router.get("/variants", getVariantsByProductId);
// router.get('/variant', getVariantByAttributes); 

// router.post("/", cartController.addToCart);

// module.exports = router;


const express = require("express");
const router = express.Router();
const db = require("../db"); // adjust if path is different
const cartController = require("../Controller/cartController");
const {
  getVariantByAttributes,
  getVariantsByProductId,
} = require('../Controller/variantController');

// POST /api/cart - Add to cart
router.post("/", cartController.addToCart);

// GET /api/cart/:uid - Get cart items for user
router.get("/:uid", async (req, res) => {
  const uid = req.params.uid;
  try {
    const [rows] = await db.query(
      `SELECT 
        c.CartID, c.UID, c.PID, c.VariantID, c.Quantity,
        p.Name, p.Price,
        v.Color, v.Size,
        v.VariantImage AS image
      FROM cart c
      JOIN products p ON c.PID = p.PID
      JOIN product_variants v ON c.VariantID = v.VariantID
      WHERE c.UID = ?`,
      [uid]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Error fetching cart:", err);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
});

// PATCH /api/cart/update-quantity - Update quantity
router.patch("/update-quantity", cartController.updateCartQuantity);

// DELETE /api/cart/delete/:uid/:variantId - Delete item from cart
router.delete("/delete/:uid/:variantId", cartController.deleteCartItem);

// DELETE /api/cart/clear/:uid - Clear cart for a user
router.delete("/clear/:uid", cartController.clearCart);

// Additional variant routes
router.get("/variants", getVariantsByProductId);
router.get('/variant', getVariantByAttributes); 

module.exports = router;
