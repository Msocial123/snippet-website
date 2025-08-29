// // routes/productRoutes.js
// const express = require("express");
// const router = express.Router();
// const productController = require("../Controller/productController");
// const variantController = require("../Controller/variantController");

// // Get variant by PID, Color, Size
// router.get("/variant/one", variantController.getVariantByAttributes);

// router.get("/:id", productController.getProductById);

// module.exports = router;


const express = require("express");
const router = express.Router();
const productController = require("../Controller/productController");
const variantController = require("../Controller/variantController");

// ✅ All products
router.get("/", productController.getAllProducts);

// ✅ Women products
router.get("/women", productController.getWomenProducts);

// ✅ Products by category
router.get("/category/:category", productController.getProductsByCategory);

// ✅ Variant by PID, Color, Size
router.get("/variant/one", variantController.getVariantByAttributes);

// ✅ Single product by ID
router.get("/:id", productController.getProductById);

module.exports = router;
