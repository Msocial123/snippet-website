// const express = require("express");
// const router = express.Router();
// const orderController = require("../Controller/orderController");

// router.post("/", orderController.createOrder);
// router.get("/", orderController.getAllOrders);
// router.get("/:id", orderController.getOrderById);
// router.put("/:id", orderController.updateOrderStatus);
// router.delete("/:id", orderController.deleteOrder);

// module.exports = router;

const express = require("express");
const router = express.Router();
const orderController = require("../Controller/orderController");

router.post("/", orderController.createOrder);
router.get("/:uid", orderController.getAllOrders); // get all orders of a user
router.get("/detail/:id", orderController.getOrderById);
router.put("/:id", orderController.updateOrderStatus);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
