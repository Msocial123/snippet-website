// backend/routes/reports.js
const express = require("express");
const router = express.Router();
const ctrl = require("../Controller/reportsController");

// GET top products
router.get("/top-products", ctrl.topProducts);

// GET top customers
router.get("/top-customers", ctrl.topCustomers);

// GET inventory status
router.get("/inventory-status", ctrl.inventoryStatus);

// GET orders over time (chart)
router.get("/orders-over-time", ctrl.ordersOverTime);

// GET export (JSON)
router.get("/export", ctrl.exportReport);

module.exports = router;
