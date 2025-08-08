// // // // backend/routes/variantRoutes.js
// // // const express = require("express");
// // // const router = express.Router();
// // // const variantController = require("../Controller/variantController");

// // // // router.get("/", variantController.getVariantId);
// // // router.get('/', variantController.getVariantByAttributes);


// // // module.exports = router;

// // const express = require("express");
// // const router = express.Router();
// // const {
// //   getVariantByAttributes,
// //   getVariantsByProductId
// // } = require("../Controller/variantController");

// // // ✅ Route for getting a variant by color/size
// // router.get("/variant", getVariantByAttributes);
// // router.get("/variants", getVariantsByProductId);

// // router.get("/variants", async (req, res) => {
// //   const { pid } = req.query;
// //   console.log("✅ getVariantsByProductId route hit with pid:", pid);

// //   try {
// //     const [rows] = await db.query("SELECT * FROM product_details WHERE PID = ?", [pid]);
// //     res.json(rows); // This sends array of variants to frontend
// //   } catch (error) {
// //     console.error("❌ Error fetching variants:", error);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // });


// const express = require("express");
// const router = express.Router();
// const variantController = require("../Controller/variantController");

// // ✅ Get all variants for a product ID
// router.get("/variants", variantController.getVariantsByProductId);

// // ✅ Get a specific variant by product ID, color, and size
// // router.get("/variant", variantController.getVariantByAttributes);
// router.get("/one", variantController.getVariantByAttributes);
// // console.log("🔍 PID:", pid, "Color:", color, "Size:", size);

// module.exports = router;

const express = require("express");
const router = express.Router();
const variantController = require("../Controller/variantController");

router.get("/one", variantController.getVariantByAttributes);

module.exports = router;
