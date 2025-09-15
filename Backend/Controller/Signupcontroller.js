// backend/authController.js
const db = require('../db'); // Adjust the path as necessary
const bcrypt = require('bcrypt');

const sendGenericError = (res) => {
  res.status(400).json({ message: 'Signup failed. Please try again.' });
};

// exports.signup = async (req, res) => {
//   const { firstName, lastName, email, contact, password } = req.body;
//   if (!firstName || !lastName || !email || !contact || !password) {
//     return sendGenericError(res);
//   }

//   try {
//     const [existing] = await db.query('SELECT * FROM users WHERE Email = ?', [email]);
//     if (existing.length > 0) return sendGenericError(res);

//     const hashed = await bcrypt.hash(password, 10);
//     await db.query(
//       'INSERT INTO users (FirstName, LastName, Email, PasswordHash, Contact) VALUES (?, ?, ?, ?, ?)',
//       [firstName, lastName, email, hashed, contact]
//     );

//     res.json({ message: 'Signup successful' });
//   } catch (err) {
//     console.error(err);
//     sendGenericError(res);
//   }
// };

// ===================== SIGNUP =====================
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, contact, address } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const normalizedEmail = email.toLowerCase();

    // Check if email exists
    const [existing] = await db.query("SELECT * FROM users WHERE Email = ?", [normalizedEmail]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Signup failed. Please try again" }); // generic message
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    const [result] = await db.query(
      "INSERT INTO users (FirstName, LastName, Email, PasswordHash, Contact, Address, CreatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW())",
      [firstName, lastName, normalizedEmail, hashedPassword, contact || null, address || null]
    );

    return res.status(201).json({
      message: "Signup successful 🎉",
      UID: result.insertId,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.googleSignup = async (req, res) => {
  const { firstName, lastName, email, contact, googleUid } = req.body;

  try {
    const [existing] = await db.query('SELECT * FROM users WHERE Email = ?', [email]);
    if (existing.length > 0)
      return res.status(200).json({ message: 'Google signup success' });

    await db.query(
      'INSERT INTO users (FirstName, LastName, Email, Contact, PasswordHash) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, contact || '', googleUid]
    );

    res.status(201).json({ message: 'Google signup success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signup failed. Please try again.' });
  }
};

exports.facebookSignup = async (req, res) => {
  const { firstName, lastName, email, contact, facebookUid } = req.body;

  try {
    const [existing] = await db.query('SELECT * FROM users WHERE Email = ?', [email]);
    if (existing.length > 0)
      return res.status(200).json({ message: 'User already exists' });

    await db.query(
      'INSERT INTO users (FirstName, LastName, Email, Contact, PasswordHash) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, contact || '', facebookUid]
    );

    res.status(201).json({ message: 'Facebook sign-up successful' });
  } catch (error) {
    console.error('Facebook signup error:', error);
    res.status(500).json({ message: 'Server error during Facebook signup' });
  }
};
