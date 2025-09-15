const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");

// POST /api/profile/change-password
router.post("/profile/change-password", async (req, res) => {
  const { uid, oldPassword, newPassword } = req.body;
  if (!uid || !oldPassword || !newPassword) {
    return res.status(400).json({ error: "All fields required" });
  }
  try {
    // Fetch user
    const [users] = await db.query("SELECT * FROM users WHERE UID = ?", [uid]);
    if (!users.length) return res.status(404).json({ error: "User not found" });

    const user = users[0];
    // Compare old password
    const match = await bcrypt.compare(oldPassword, user.PasswordHash);
    if (!match) return res.status(401).json({ error: "Old password incorrect" });

    const newHash = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET PasswordHash = ? WHERE UID = ?", [newHash, uid]);
    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;