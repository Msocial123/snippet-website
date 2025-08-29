
const express = require("express");
const router = express.Router();
const orderController = require("../Controller/orderController");

// Create order
router.post("/", orderController.createOrder);

// Get order details by orderId (single order)
router.get("/order/:orderId", orderController.getOrderById);

// Get all orders for a user
router.get("/user/:uid", orderController.getAllOrders);

// Delete order item
router.delete("/item/:itemId", orderController.deleteOrderItem);

module.exports = router;
