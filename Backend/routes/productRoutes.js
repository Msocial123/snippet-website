// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../Controller/productController");
const variantController = require("../Controller/variantController");

// Get variant by PID, Color, Size
router.get("/variant/one", variantController.getVariantByAttributes);

router.get("/:id", productController.getProductById);

module.exports = router;
