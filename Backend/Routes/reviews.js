const express = require('express');
const router = express.Router();
const db = require('../db');

// 🟢 POST /api/reviews/add-review
router.post('/add-review', async (req, res) => {
  const { userId, productId, rating, reviewText } = req.body;

  if (!userId || !productId || !rating || !reviewText) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await db.query(
      `INSERT INTO reviews (UID, PID, Rating, Comment, CreatedAt)
       VALUES (?, ?, ?, ?, NOW())`,
      [userId, productId, rating, reviewText]
    );

    res.json({ message: 'Review added successfully' });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

module.exports = router;
