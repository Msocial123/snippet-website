// const db = require("../db");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");
// const bcrypt = require("bcrypt");

// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   db.query("SELECT * FROM users WHERE Email = ?", [email], async (err, results) => {
//     if (err) return res.status(500).json({ message: "Internal server error" });
//     if (results.length === 0) return res.status(401).json({ message: "Invalid email or password" });

//     const user = results[0];
//     const isMatch = await bcrypt.compare(password, user.PasswordHash);
//     if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

//     res.status(200).json({ message: "Login successful 🎉" });
//   });
// };

// exports.forgotPassword = (req, res) => {
//   const { email } = req.body;

//   db.query("SELECT * FROM users WHERE Email = ?", [email], (err, results) => {
//     if (err) return res.status(500).send({ message: "Server error" });
//     if (results.length === 0) return res.status(404).send({ message: "User not found" });

//     const token = crypto.randomBytes(32).toString("hex");
//     const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

//     db.query(`
//       CREATE TABLE IF NOT EXISTS password_resets (
//         email VARCHAR(100),
//         token VARCHAR(255),
//         expires_at DATETIME
//       )
//     `);

//     db.query(
//       "INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)",
//       [email, token, expires_at],
//       (err2) => {
//         if (err2) return res.status(500).send({ message: "DB error" });

//         const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: process.env.GMAIL_USER,
//             pass: process.env.GMAIL_PASS,
//           },
//         });

//         const resetLink = `http://localhost:3000/reset-password?token=${token}`;
//         const mailOptions = {
//           from: "Snitch Store <yourgmail@gmail.com>",
//           to: email,
//           subject: "Password Reset Link",
//           html: `
//             <h3>Password Reset</h3>
//             <p>Click the link below to reset your password:</p>
//             <a href="${resetLink}">${resetLink}</a>
//           `,
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//           if (error) return res.status(500).send({ message: "Failed to send email" });
//           return res.status(200).send({ message: "Reset link sent to email" });
//         });
//       }
//     );
//   });
// };

// exports.resetPassword = async (req, res) => {
//   const { token, newPassword } = req.body;

//   if (!token || !newPassword) {
//     return res.status(400).json({ message: "Token and new password are required." });
//   }

//   db.query(
//     "SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()",
//     [token],
//     async (err, results) => {
//       if (err) return res.status(500).json({ message: "DB error" });
//       if (results.length === 0) return res.status(400).json({ message: "Invalid or expired token" });

//       const email = results[0].email;
//       const hashedPassword = await bcrypt.hash(newPassword, 10);

//       db.query("UPDATE users SET PasswordHash = ? WHERE Email = ?", [hashedPassword, email], (err2) => {
//         if (err2) return res.status(500).json({ message: "Password update failed" });

//         db.query("DELETE FROM password_resets WHERE token = ?", [token]);
//         res.status(200).json({ message: "Password successfully reset ✅" });
//       });
//     }
//   );
// };



const db = require("../db");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// LOGIN
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

// FORGOT PASSWORD
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
    const expires_at = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 mins

    await db.query(`
      CREATE TABLE IF NOT EXISTS password_resets (
        email VARCHAR(100),
        token VARCHAR(255),
        expires_at DATETIME
      )
    `);

    await db.query("INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)", [
      normalizedEmail,
      token,
      expires_at,
    ]);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    const mailOptions = {
      from: "Snitch Store <yourgmail@gmail.com>",
      to: normalizedEmail,
      subject: "Password Reset Link",
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password. This link will expire in 10 minutes:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Reset link sent to email ✅" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    return res.status(500).json({ message: "Failed to process forgot password request" });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword)
      return res.status(400).json({ message: "Token and new password are required" });

    const [results] = await db.query(
      "SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()",
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
