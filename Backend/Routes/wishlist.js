// const express = require("express");
// const router = express.Router();
// const wishlistController = require("../Controllers/wishlistController");

// router.post("/add", wishlistController.addToWishlist);
// router.delete("/remove", wishlistController.removeFromWishlist);
// router.get("/:uid", wishlistController.getWishlist);

// module.exports = router;

// Routes/wishlist.js
// const express = require("express");
// const router = express.Router();
// const wishlistController = require("../Controller/wishlistController");

// // router.post("/add", wishlistController.addToWishlist);
// // router.delete("/remove", wishlistController.removeFromWishlist);
// // router.get("/:uid", wishlistController.getWishlist);
// // router.get("/count/:UID", wishlistController.getWishlistCount);
// // // router.post("/add", wishlistController.addToWishlist);
// // router.get("/fetch/:uid", wishlistController.getWishlist);


// router.post("/add", wishlistController.addToWishlist);
// router.post("/remove", wishlistController.removeFromWishlist);
// router.get("/:uid", wishlistController.getWishlist);
// router.get("/count/:UID", wishlistController.getWishlistCount);
// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const wishlistController = require("../Controller/wishlistController");

// router.get("/fetch/:UID", wishlistController.getWishlist);
// router.post("/add", wishlistController.addToWishlist);
// router.post("/remove", wishlistController.removeFromWishlist);
// router.get("/count/:UID", wishlistController.getWishlistCount);
// router.get("/:UID", wishlistController.getWishlist); // optional

// module.exports = router;
const express = require("express");
const router = express.Router();
const wishlistController = require("../Controller/wishlistController");

// ✅ Correct route
router.get("/fetch/:UID", wishlistController.getWishlist);

router.post("/add", wishlistController.addToWishlist);
router.delete("/remove", wishlistController.removeFromWishlist);

// router.get("/count/:UID", wishlistController.getWishlistCount);

// ❌ REMOVE this to avoid conflict
// router.get("/:UID", wishlistController.getWishlist);

module.exports = router;
