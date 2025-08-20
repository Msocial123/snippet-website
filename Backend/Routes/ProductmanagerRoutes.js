const express = require("express");
const router = express.Router();
const productController = require("../Controller/ProductManagerController");

// Routes
router.post("/add", productController.addProduct);
router.put("/edit/:id", productController.editProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.get("/all", productController.getAllProducts);

module.exports = router;
