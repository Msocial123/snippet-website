// backend/routes/adminWishlistCart.js
const express = require("express");
const router = express.Router();
const controller = require("../Controller/adminWishlistCartController");

router.get("/wishlist", controller.getAllWishlist);
router.get("/cart", controller.getAllCart);

// optional: get wishlist for a single user
router.get("/wishlist/user/:uid", controller.getWishlistByUser);
// optional: get cart for a single user
router.get("/cart/user/:uid", controller.getCartByUser);

module.exports = router;
