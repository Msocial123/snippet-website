
const db = require("../db");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// ===================== LOGIN =====================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const normalizedEmail = email.toLowerCase();
    const [results] = await db.query("SELECT * FROM users WHERE Email = ?", [normalizedEmail]);

    if (results.length === 0)
      return res.status(401).json({ message: "Invalid email or password" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.PasswordHash);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    return res.status(200).json({ message: "Login successful 🎉", UID: user.UID });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ===================== FORGOT PASSWORD =====================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Email is required" });

    const normalizedEmail = email.toLowerCase();
    const [results] = await db.query("SELECT * FROM users WHERE Email = ?", [normalizedEmail]);

    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const expires_at = new Date(Date.now() + 15 * 60 * 1000); // expires in 15 mins

    await db.query(`
      CREATE TABLE IF NOT EXISTS password_resets (
        email VARCHAR(100),
        token VARCHAR(255),
        expires_at DATETIME
      )
    `);

    await db.query("DELETE FROM password_resets WHERE email = ?", [normalizedEmail]); // Clear old tokens
    await db.query(
      "INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)",
      [normalizedEmail, token, expires_at]
    );

    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${token}`;
    const mailOptions = {
      from: `Snitch Store <${process.env.GMAIL_USER}>`,
      to: normalizedEmail,
      subject: "Password Reset Link",
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Reset link sent to email ✅" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    return res.status(500).json({ message: "Failed to process forgot password request" });
  }
};

// ===================== RESET PASSWORD =====================
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword)
      return res.status(400).json({ message: "Token and new password are required" });

    // Validate password strength
    if (newPassword.length < 8)
      return res.status(400).json({ message: "Password must be at least 8 characters long" });

    const [results] = await db.query(
      "SELECT * FROM password_resets WHERE token = ? AND expires_at > now()",
      [token]
    );

    if (results.length === 0)
      return res.status(400).json({ message: "Invalid or expired token" });

    const email = results[0].email;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query("UPDATE users SET PasswordHash = ? WHERE Email = ?", [hashedPassword, email]);
    await db.query("DELETE FROM password_resets WHERE token = ?", [token]);

    return res.status(200).json({ message: "Password successfully reset ✅" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(500).json({ message: "Failed to reset password" });
  }
};
