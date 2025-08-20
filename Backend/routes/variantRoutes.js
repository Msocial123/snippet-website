

const express = require("express");
const router = express.Router();
const variantController = require("../Controller/variantController");

router.get("/one", variantController.getVariantByAttributes);

module.exports = router;
