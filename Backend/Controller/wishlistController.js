// const db = require("../db");

// // ✅ Add to Wishlist
// exports.addToWishlist = async (req, res) => {
//   const { UID, PID } = req.body;
//   try {
//     const [existing] = await db.query("SELECT * FROM wishlist WHERE UID = ? AND PID = ?", [UID, PID]);
//     if (existing.length > 0) {
//       return res.status(409).json({ message: "Already in wishlist" });
//     }

//     await db.query("INSERT INTO wishlist (UID, PID, AddedAt) VALUES (?, ?, NOW())", [UID, PID]);

//     res.json({ message: "Added to wishlist" });
//   } catch (err) {
//     res.status(500).json({ message: "Error adding to wishlist", error: err.message });
//   }
// };

// // ✅ Remove from Wishlist
// exports.removeFromWishlist = async (req, res) => {
//   const { UID, PID } = req.body;
//   try {
//     await db.query("DELETE FROM wishlist WHERE UID = ? AND PID = ?", [UID, PID]);
//     res.json({ message: "Removed from wishlist" });
//   } catch (err) {
//     res.status(500).json({ message: "Error removing from wishlist", error: err.message });
//   }
// };

// // ✅ Get Wishlist for User
// exports.getWishlist = async (req, res) => {
//   const UID = req.params.UID;
//   try {
//     const [results] = await db.query(
//   "SELECT wishlist.PID, products.Name, products.Price, products.ImageURL FROM wishlist JOIN products ON wishlist.PID = products.PID WHERE wishlist.UID = ?",
//   [UID]
// );
//     res.json(results);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching wishlist", error: err.message });
//   }
// };
// exports.getWishlistCount = async (req, res) => {
//   const UID = req.params.UID;
//   try {
//     const [count] = await db.query(
//       "SELECT COUNT(*) AS count FROM wishlist WHERE UID = ?", 
//       [UID]
//     );
//     res.json({ count: count[0].count });
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching wishlist count", error: err.message });
//   }
// };



// Controller/wishlistController.js
// const db = require("../db");

// // ✅ Add to Wishlist
// exports.addToWishlist = async (req, res) => {
//   const { UID, PID } = req.body;
//   if (!UID || !PID) return res.status(400).json({ message: "Missing UID or PID" });

//   try {
//     const [existing] = await db.query("SELECT * FROM wishlist WHERE UID = ? AND PID = ?", [UID, PID]);
//     if (existing.length > 0) {
//       return res.status(409).json({ message: "Already in wishlist" });
//     }

//     await db.query("INSERT INTO wishlist (UID, PID) VALUES (?, ?)", [UID, PID]);
//     res.json({ message: "Added to wishlist" });
//   } catch (err) {
//     console.error("Add wishlist error:", err);
//     res.status(500).json({ message: "Error adding to wishlist", error: err.message });
//   }
// };

// // ✅ Remove from Wishlist
// exports.removeFromWishlist = async (req, res) => {
//   const { UID, PID } = req.body;
//   if (!UID || !PID) return res.status(400).json({ message: "Missing UID or PID" });

//   try {
//     await db.query("DELETE FROM wishlist WHERE UID = ? AND PID = ?", [UID, PID]);
//     res.json({ message: "Removed from wishlist" });
//   } catch (err) {
//     console.error("Remove wishlist error:", err);
//     res.status(500).json({ message: "Error removing from wishlist", error: err.message });
//   }
// };

// // ✅ Get Wishlist
// exports.getWishlist = (req, res) => {
//   const uid = req.params.uid;

//   if (!uid) {
//     return res.status(400).json({ error: "UID is missing" });
//   }

//   const query = `
//     SELECT w.WishlistID, w.UID, w.PID, p.Name, p.Price, pd.Images
//     FROM wishlist w
//     JOIN products p ON w.PID = p.PID
//     LEFT JOIN product_details pd ON p.PID = pd.PID
//     WHERE w.UID = ?
//   `;

//   db.query(query, [uid], (err, results) => {
//     if (err) {
//       console.error("Error fetching wishlist:", err);
//       return res.status(500).json({ error: "Failed to fetch wishlist" });
//     }

//     res.status(200).json(results);
//   });
// };
// // ✅ Wishlist Count
// exports.getWishlistCount = async (req, res) => {
//   const UID = req.params.UID;
//   if (!UID) return res.status(400).json({ message: "UID is required" });

//   try {
//     const [count] = await db.query("SELECT COUNT(*) AS count FROM wishlist WHERE UID = ?", [UID]);
//     res.json({ count: count[0].count });
//   } catch (err) {
//     console.error("Wishlist count error:", err);
//     res.status(500).json({ message: "Error fetching wishlist count", error: err.message });
//   }
// };
// exports.addToWishlist = async (req, res) => {
//   const { UID, PID } = req.body;

//   if (!UID || !PID) {
//     return res.status(400).json({ error: "UID and PID are required" });
//   }

//   try {
//     const query = `INSERT INTO wishlist (UID, PID) VALUES (?, ?)`;
//     await db.query(query, [UID, PID]);
//     res.status(201).json({ message: "Product added to wishlist" });
//   } catch (error) {
//     console.error("Add to wishlist error:", error);
//     res.status(500).json({ error: "Failed to add to wishlist" });
//   }
// };



// const db = require("../db");

// // ✅ Add to Wishlist
// exports.addToWishlist = async (req, res) => {
//   const { UID, PID } = req.body;

//   if (!UID || !PID) {
//     return res.status(400).json({ message: "UID and PID are required" });
//   }

//   try {
//     const [existing] = await db.query(
//       "SELECT * FROM wishlist WHERE UID = ? AND PID = ?",
//       [UID, PID]
//     );

//     if (existing.length > 0) {
//       return res.status(409).json({ message: "Product already in wishlist" });
//     }

//     await db.query("INSERT INTO wishlist (UID, PID) VALUES (?, ?)", [UID, PID]);
//     res.status(201).json({ message: "Product added to wishlist" });
//   } catch (error) {
//     console.error("Add to wishlist error:", error);
//     res.status(500).json({ message: "Failed to add to wishlist" });
//   }
// };

// // ✅ Remove from Wishlist
// exports.removeFromWishlist = async (req, res) => {
//   const { UID, PID } = req.body;

//   if (!UID || !PID) {
//     return res.status(400).json({ message: "UID and PID are required" });
//   }

//   try {
//     await db.query("DELETE FROM wishlist WHERE UID = ? AND PID = ?", [UID, PID]);
//     res.json({ message: "Removed from wishlist" });
//   } catch (err) {
//     console.error("Remove wishlist error:", err);
//     res.status(500).json({ message: "Error removing from wishlist", error: err.message });
//   }
// };

// // ✅ Get Wishlist Items by UID
// exports.getWishlist = async (req, res) => {
//   const UID = req.params.uid;

//   if (!UID) {
//     return res.status(400).json({ message: "UID is missing" });
//   }

//   const query = `
//     SELECT w.WishlistID, w.UID, w.PID, p.Name, p.Price, pd.Images
//     FROM wishlist w
//     JOIN products p ON w.PID = p.PID
//     LEFT JOIN product_details pd ON p.PID = pd.PID
//     WHERE w.UID = ?
//   `;

//   try {
//     const [results] = await db.query(query, [UID]);
//     res.status(200).json(results);
//   } catch (err) {
//     console.error("Error fetching wishlist:", err);
//     res.status(500).json({ message: "Failed to fetch wishlist" });
//   }
// };

// // ✅ Get Wishlist Count
// exports.getWishlistCount = async (req, res) => {
//   const UID = req.params.UID;

//   if (!UID) {
//     return res.status(400).json({ message: "UID is required" });
//   }

//   try {
//     const [count] = await db.query("SELECT COUNT(*) AS count FROM wishlist WHERE UID = ?", [UID]);
//     res.json({ count: count[0].count });
//   } catch (err) {
//     console.error("Wishlist count error:", err);
//     res.status(500).json({ message: "Error fetching wishlist count", error: err.message });
//   }
// };
const db = require("../db");

// ✅ Add to Wishlist
exports.addToWishlist = async (req, res) => {
  const { UID, PID } = req.body;
  if (!UID || !PID) return res.status(400).json({ message: "UID and PID are required" });

  try {
    const [existing] = await db.query(
      "SELECT * FROM wishlist WHERE UID = ? AND PID = ?",
      [UID, PID]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "Product already in wishlist" });
    }

    await db.query("INSERT INTO wishlist (UID, PID) VALUES (?, ?)", [UID, PID]);
    res.status(201).json({ message: "Product added to wishlist" });
  } catch (error) {
    console.error("Add to wishlist error:", error);
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
};

// ✅ Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
  const { UID, PID } = req.body;
  console.log("Removing from wishlist:", UID, PID); // ✅ Debug log

  if (!UID || !PID)
    return res.status(400).json({ message: "UID and PID are required" });

  try {
    await db.query("DELETE FROM wishlist WHERE UID = ? AND PID = ?", [UID, PID]);
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error("Remove wishlist error:", err);
    res.status(500).json({ message: "Error removing from wishlist", error: err.message });
  }
};

// ✅ Get Wishlist Items by UID
exports.getWishlist = async (req, res) => {
  const UID = req.params.UID;
  console.log("Fetching wishlist UID:", UID);

  if (!UID) {
    return res.status(400).json({ message: "UID is missing" });
  }

  try {
    const [wishlist] = await db.query(
      `SELECT w.WishlistID, w.UID, w.PID, p.Name, p.Price, pd.Images
       FROM wishlist w
       JOIN products p ON w.PID = p.PID
       LEFT JOIN product_details pd ON p.PID = pd.PID
       WHERE w.UID = ?`,
      [UID]
    );

    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Error fetching wishlist" });
  }
};

// ✅ Get Wishlist Count
exports.getWishlistCount = async (req, res) => {
  const UID = req.params.UID;
  if (!UID) return res.status(400).json({ message: "UID is required" });

  try {
    const [count] = await db.query("SELECT COUNT(*) AS count FROM wishlist WHERE UID = ?", [UID]);
    res.json({ count: count[0].count });
  } catch (err) {
    console.error("Wishlist count error:", err);
    res.status(500).json({ message: "Error fetching wishlist count", error: err.message });
  }
};
