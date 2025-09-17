const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController');

// Debug log
router.use((req, res, next) => {
  console.log(`🌟 Route hit: ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Category route FIRST (before /:id)
router.get('/category/:category', productController.getProductsByCategory);

// ✅ Women products
router.get('/women', productController.getWomenProducts);

// ✅ All products
router.get('/', productController.getAllProducts);

// ✅ Product by ID — must come after category route
router.get('/:id', productController.getProductById);

// ✅ Reviews for product
router.get('/:id/reviews', productController.getProductReviews);

module.exports = router;
