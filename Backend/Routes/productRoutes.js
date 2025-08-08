const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController'); // ✅ Corrected path
// const Landingpagecontroller = require('../Controller/Landingpagecontroller'); // ✅ Corrected path
// router.get('/', productController.getAllProducts);
router.get('/women', productController.getWomenProducts); // ✅ /api/products/women
// router.get('/category/:category', productController.getProductsByCategory);
// router.get('/:id', productController.getProductById);
// router.get('/:id/reviews', productController.getProductReviews);
// router.get('/landing', Landingpagecontroller.getLandingProducts);
// router.get('/reviews', Landingpagecontroller.getLatestReviews);

module.exports = router;
