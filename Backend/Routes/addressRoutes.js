const express = require("express");
const router = express.Router();
const db = require("../db"); // adjust path as needed

// Get all addresses for a user
router.get("/user/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM addresses WHERE UID = ?", [uid]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch addresses" });
  }
});

// Add a new address for a user
router.post("/user/:uid", async (req, res) => {
  const { uid } = req.params;
  const { name, phone, address, city, state, pincode } = req.body;
  try {
    await db.query(
      "INSERT INTO addresses (UID, Name, Phone, Address, City, State, Pincode) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [uid, name, phone, address, city, state, pincode]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to add address" });
  }
});

module.exports = router;