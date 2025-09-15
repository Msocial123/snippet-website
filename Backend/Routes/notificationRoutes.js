const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all notifications for a user
router.get("/notifications/user/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT * FROM notifications WHERE UID = ? ORDER BY CreatedAt DESC",
      [uid]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// Mark notification as read
router.post("/notifications/read/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE notifications SET IsRead = 1 WHERE NotificationID = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update notification" });
  }
});

module.exports = router;