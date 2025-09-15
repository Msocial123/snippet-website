const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/bulk', async (req, res) => {
  const { variantIds } = req.body;
  if (!variantIds || !variantIds.length) return res.json([]);
  try {
    const [rows] = await db.query(
      `SELECT v.VariantID, v.Size, v.Color, v.VariantImage, p.Name
       FROM product_variants v
       JOIN products p ON v.PID = p.PID
       WHERE v.VariantID IN (?)`,
      [variantIds]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch variants" });
  }
});

// In your orders router file (e.g., Routes/orderRoutes.js)

// router.post('/cancel/:orderId', async (req, res) => {
//   const { orderId } = req.params;
//   try {
//     // Optionally check if order exists and can be cancelled (e.g., not already shipped)
//     const [orderCheck] = await db.query('SELECT Status FROM orders WHERE OrderID = ?', [orderId]);
//     if (orderCheck.length === 0) return res.status(404).json({ error: 'Order not found' });

//     if (['Shipped', 'Delivered', 'Cancelled'].includes(orderCheck[0].Status)) {
//       return res.status(400).json({ error: `Cannot cancel order with status ${orderCheck[0].Status}` });
//     }

//     // Update order status to Cancelled
//     await db.query('UPDATE orders SET Status = ? WHERE OrderID = ?', ['Cancelled', orderId]);
//     res.json({ message: 'Order cancelled successfully', orderId });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to cancel order' });
//   }
// });

// // In your product or reviews router file (e.g., Routes/reviewRoutes.js)

// router.post('/add-review', async (req, res) => {
//   /*
//     Expected body:
//     {
//       userId: number,
//       productId: number,
//       rating: number,  // e.g. 1 to 5
//       reviewText: string
//     }
//   */
//   const { userId, productId, rating, reviewText } = req.body;

//   if (!userId || !productId || !rating || rating < 1 || rating > 5) {
//     return res.status(400).json({ error: 'Invalid input data' });
//   }

//   try {
//     await db.query(
//       `INSERT INTO product_reviews (UserID, ProductID, Rating, ReviewText, CreatedAt) 
//        VALUES (?, ?, ?, ?, NOW())`,
//       [userId, productId, rating, reviewText]
//     );
//     res.json({ message: 'Review added successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to add review' });
//   }
// });

module.exports = router;