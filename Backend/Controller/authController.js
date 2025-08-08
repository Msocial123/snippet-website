// // // const db = require("../db");
// // // const crypto = require("crypto");
// // // const nodemailer = require("nodemailer");
// // // const bcrypt = require("bcrypt");

// // // exports.login = (req, res) => {
// // //   const { email, password } = req.body;

// // //   db.query("SELECT * FROM users WHERE Email = ?", [email], async (err, results) => {
// // //     if (err) return res.status(500).json({ message: "Internal server error" });
// // //     if (results.length === 0) return res.status(401).json({ message: "Invalid email or password" });

// // //     const user = results[0];
// // //     const isMatch = await bcrypt.compare(password, user.PasswordHash);
// // //     if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

// // //     res.status(200).json({ message: "Login successful 🎉" });
// // //   });
// // // };

// // // exports.forgotPassword = (req, res) => {
// // //   const { email } = req.body;

// // //   db.query("SELECT * FROM users WHERE Email = ?", [email], (err, results) => {
// // //     if (err) return res.status(500).send({ message: "Server error" });
// // //     if (results.length === 0) return res.status(404).send({ message: "User not found" });

// // //     const token = crypto.randomBytes(32).toString("hex");
// // //     const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

// // //     db.query(`
// // //       CREATE TABLE IF NOT EXISTS password_resets (
// // //         email VARCHAR(100),
// // //         token VARCHAR(255),
// // //         expires_at DATETIME
// // //       )
// // //     `);

// // //     db.query(
// // //       "INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)",
// // //       [email, token, expires_at],
// // //       (err2) => {
// // //         if (err2) return res.status(500).send({ message: "DB error" });

// // //         const transporter = nodemailer.createTransport({
// // //           service: "gmail",
// // //           auth: {
// // //             user: process.env.GMAIL_USER,
// // //             pass: process.env.GMAIL_PASS,
// // //           },
// // //         });

// // //         const resetLink = `http://localhost:3000/reset-password?token=${token}`;
// // //         const mailOptions = {
// // //           from: "Snitch Store <yourgmail@gmail.com>",
// // //           to: email,
// // //           subject: "Password Reset Link",
// // //           html: `
// // //             <h3>Password Reset</h3>
// // //             <p>Click the link below to reset your password:</p>
// // //             <a href="${resetLink}">${resetLink}</a>
// // //           `,
// // //         };

// // //         transporter.sendMail(mailOptions, (error, info) => {
// // //           if (error) return res.status(500).send({ message: "Failed to send email" });
// // //           return res.status(200).send({ message: "Reset link sent to email" });
// // //         });
// // //       }
// // //     );
// // //   });
// // // };

// // // exports.resetPassword = async (req, res) => {
// // //   const { token, newPassword } = req.body;

// // //   if (!token || !newPassword) {
// // //     return res.status(400).json({ message: "Token and new password are required." });
// // //   }

// // //   db.query(
// // //     "SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()",
// // //     [token],
// // //     async (err, results) => {
// // //       if (err) return res.status(500).json({ message: "DB error" });
// // //       if (results.length === 0) return res.status(400).json({ message: "Invalid or expired token" });

// // //       const email = results[0].email;
// // //       const hashedPassword = await bcrypt.hash(newPassword, 10);

// // //       db.query("UPDATE users SET PasswordHash = ? WHERE Email = ?", [hashedPassword, email], (err2) => {
// // //         if (err2) return res.status(500).json({ message: "Password update failed" });

// // //         db.query("DELETE FROM password_resets WHERE token = ?", [token]);
// // //         res.status(200).json({ message: "Password successfully reset ✅" });
// // //       });
// // //     }
// // //   );
// // // };

// // const db = require("../db");
// // const crypto = require("crypto");
// // const nodemailer = require("nodemailer");
// // const bcrypt = require("bcrypt");

// // exports.login = (req, res) => {
// //   const { email, password } = req.body;

// //   db.query("SELECT * FROM users WHERE Email = ?", [email], async (err, results) => {
// //     if (err) return res.status(500).json({ message: "Internal server error" });
// //     if (results.length === 0) return res.status(401).json({ message: "Invalid email or password" });

// //     const user = results[0];
// //     const isMatch = await bcrypt.compare(password, user.PasswordHash);
// //     if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

// //     res.status(200).json({ message: "Login successful 🎉" });
// //   });
// // };

// // exports.forgotPassword = (req, res) => {
// //   const { email } = req.body;

// //   db.query("SELECT * FROM users WHERE Email = ?", [email], (err, results) => {
// //     if (err) return res.status(500).send({ message: "Server error" });
// //     if (results.length === 0) return res.status(404).send({ message: "User not found" });

// //     const token = crypto.randomBytes(32).toString("hex");
// //     const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

// //     db.query(`
// //       CREATE TABLE IF NOT EXISTS password_resets (
// //         email VARCHAR(100),
// //         token VARCHAR(255),
// //         expires_at DATETIME
// //       )
// //     `);

// //     db.query(
// //       "INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)",
// //       [email, token, expires_at],
// //       (err2) => {
// //         if (err2) return res.status(500).send({ message: "DB error" });

// //         const transporter = nodemailer.createTransport({
// //           service: "gmail",
// //           auth: {
// //             user: process.env.GMAIL_USER,
// //             pass: process.env.GMAIL_PASS,
// //           },
// //         });

// //         const resetLink = `http://localhost:3000/reset-password?token=${token}`;
// //         const mailOptions = {
// //           from: "Snitch Store <yourgmail@gmail.com>",
// //           to: email,
// //           subject: "Password Reset Link",
// //           html: `
// //             <h3>Password Reset</h3>
// //             <p>Click the link below to reset your password:</p>
// //             <a href="${resetLink}">${resetLink}</a>
// //           `,
// //         };

// //         transporter.sendMail(mailOptions, (error, info) => {
// //           if (error) return res.status(500).send({ message: "Failed to send email" });
// //           return res.status(200).send({ message: "Reset link sent to email" });
// //         });
// //       }
// //     );
// //   });
// // };

// // exports.resetPassword = async (req, res) => {
// //   const { token, newPassword } = req.body;

// //   if (!token || !newPassword) {
// //     return res.status(400).json({ message: "Token and new password are required." });
// //   }

// //   db.query(
// //     "SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()",
// //     [token],
// //     async (err, results) => {
// //       if (err) return res.status(500).json({ message: "DB error" });
// //       if (results.length === 0) return res.status(400).json({ message: "Invalid or expired token" });

// //       const email = results[0].email;
// //       const hashedPassword = await bcrypt.hash(newPassword, 10);

// //       db.query("UPDATE users SET PasswordHash = ? WHERE Email = ?", [hashedPassword, email], (err2) => {
// //         if (err2) return res.status(500).json({ message: "Password update failed" });

// //         db.query("DELETE FROM password_resets WHERE token = ?", [token]);
// //         res.status(200).json({ message: "Password successfully reset ✅" });
// //       });
// //     }
// //   );
// // };


// const db = require("../db");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");
// const bcrypt = require("bcrypt");

// // exports.login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const [results] = await db.query("SELECT * FROM users WHERE Email = ?", [email]);
// //     if (results.length === 0) return res.status(401).json({ message: "Invalid email or password" });

// //     const user = results[0];
// //     const isMatch = await bcrypt.compare(password, user.PasswordHash);
// //     if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

// //     res.status(200).json({ message: "Login successful 🎉" });
// //   } catch (err) {
// //     console.error("Login error:", err);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("Login attempt:", email, password);

//     const [results] = await db.query("SELECT * FROM users WHERE Email = ?", [email]);
//     if (results.length === 0) {
//       console.log("User not found");
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const user = results[0];
//     console.log("User from DB:", user.Email);

//     const isMatch = await bcrypt.compare(password, user.PasswordHash);
//     console.log("Password match:", isMatch);

//     if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

//     res.status(200).json({ message: "Login successful!" });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// // const bcrypt = require('bcrypt');
// // const jwt = require('jsonwebtoken');

// // // inside POST /login
// // if (!user) {
// //   return res.status(401).json({ message: "Invalid credentials" });
// // }

// // const isMatch = await bcrypt.compare(password, user.password);
// // if (!isMatch) {
// //   return res.status(401).json({ message: "Invalid credentials" });
// // }

// require('dotenv').config();
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });


// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
     
//     const [results] = await db.query("SELECT * FROM users WHERE Email = ?", [email]);
//     if (results.length === 0) return res.status(404).json({ message: "User not found" });

//     const token = crypto.randomBytes(32).toString("hex");
//     const expires_at = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
//  // 10 minutes
// console.log("Token from user:", token);
//     // Ensure password_resets table exists
//     await db.query(`
//       CREATE TABLE IF NOT EXISTS password_resets (
//         email VARCHAR(100),
//         token VARCHAR(255),
//         expires_at DATETIME
//       )
//     `);

//     await db.query(
//       "INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)",
//       [email, token, expires_at]
//     );

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//       },
//     });

//     const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
//     const mailOptions = {
//       from: "Snitch Store <yourgmail@gmail.com>",
//       to: email,
//       subject: "Password Reset Link",
//       html: `
//         <h3>Password Reset</h3>
//         <p>Click the link below to reset your password:</p>
//         <a href="${resetLink}">${resetLink}</a>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: "Reset link sent to email" });
//   } catch (err) {
//     console.error("Forgot password error:", err);
//     res.status(500).json({ message: "Failed to process password reset request" });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body;

//     if (!token || !newPassword) {
//       return res.status(400).json({ message: "Token and new password are required." });
//     }

//     const [results] = await db.query(
//       "SELECT * FROM password_resets WHERE token = ? AND expires_at > UTC_TIMESTAMP()",
//       [token]
//     );

//     if (results.length === 0) {
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }

//     const email = results[0].email;
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     await db.query("UPDATE users SET PasswordHash = ? WHERE Email = ?", [hashedPassword, email]);
//     await db.query("DELETE FROM password_resets WHERE token = ?", [token]);

//     res.status(200).json({ message: "Password successfully reset ✅" });
//   } catch (err) {
//     console.error("Reset password error:", err);
//     res.status(500).json({ message: "Failed to reset password" });
//   }
// };


const db = require("../db");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();

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
    const [results] = await db.query("SELECT * FROM users WHERE Email = ?", [email]);

    if (results.length === 0) return res.status(401).json({ message: "Invalid email or password" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.PasswordHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    res.status(200).json({ message: "Logged In" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ===================== FORGOT PASSWORD =====================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const [results] = await db.query("SELECT * FROM users WHERE Email = ?", [email]);

    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const expires_at = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await db.query(`
      CREATE TABLE IF NOT EXISTS password_resets (
        email VARCHAR(100),
        token VARCHAR(255),
        expires_at DATETIME
      )
    `);

    await db.query("DELETE FROM password_resets WHERE email = ?", [email]); // Clear any old tokens

    await db.query(
      "INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)",
      [email, token, expires_at]
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const mailOptions = {
      from: `Snitch Store <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Password Reset Link",
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Reset link sent to email ✅" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
};

// ===================== RESET PASSWORD =====================
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required." });
    }

    // Step 1: Validate password strength first
    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // Step 2: Find valid token
    const [results] = await db.query(
      "SELECT * FROM password_resets WHERE token = ? AND expires_at > UTC_TIMESTAMP()",
      [token]
    );

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const email = results[0].email;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Step 3: Update password
    await db.query("UPDATE users SET PasswordHash = ? WHERE Email = ?", [hashedPassword, email]);

    // Step 4: Invalidate token only after success
    await db.query("DELETE FROM password_resets WHERE token = ?", [token]);

    res.status(200).json({ message: "Password successfully reset ✅" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Failed to reset password" });
  }
};
