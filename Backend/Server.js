

// // backend/index.js
// const express = require('express');
// const mysql = require('mysql2/promise');
// const bcrypt = require('bcrypt');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ MySQL connection
// const db = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'swethar@2003',
//   database: 'snitch_store'
// });

// // ✅ Helper to send generic error
// const sendGenericError = (res) => {
//   res.status(400).json({ message: 'Signup failed. Please try again.' });
// };

// // ✅ Signup route
// app.post('/api/signup', async (req, res) => {
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
// });

// app.post('/api/google-signup', async (req, res) => {
//   const { firstName, lastName, email, contact, googleUid } = req.body;

//   try {
//     const [existing] = await db.query('SELECT * FROM users WHERE Email = ?', [email]);
//     if (existing.length > 0)
//       return res.status(200).json({ message: 'Google signup success' });

//     await db.query(
//       'INSERT INTO users (FirstName, LastName, Email, Contact, PasswordHash) VALUES (?, ?, ?, ?, ?)',
//       [firstName, lastName, email, contact || '', googleUid]
//     );

//     res.status(201).json({ message: 'Google signup success' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Signup failed. Please try again.' });
//   }
// });

// // Facebook Signup Route
// app.post('/api/facebook-signup', async (req, res) => {
//   const { firstName, lastName, email, contact, facebookUid } = req.body;

//   try {
//     const [existing] = await db.query('SELECT * FROM users WHERE Email = ?', [email]);
//     if (existing.length > 0)
//       return res.status(200).json({ message: 'User already exists' });

//     await db.query(
//       'INSERT INTO users (FirstName, LastName, Email, Contact, PasswordHash) VALUES (?, ?, ?, ?, ?)',
//       [firstName, lastName, email, contact || '', facebookUid]
//     );

//     res.status(201).json({ message: 'Facebook sign-up successful' });
//   } catch (error) {
//     console.error('Facebook signup error:', error);
//     res.status(500).json({ message: 'Server error during Facebook signup' });
//   }
// });


// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));



// backend/server.js
// const express = require('express');
// const cors = require('cors');
// const {
//   signup,
//   googleSignup,
//   facebookSignup
// } = require('./Controller/Signupcontroller');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.post('/api/signup', signup);
// app.post('/api/google-signup', googleSignup);
// app.post('/api/facebook-signup', facebookSignup);

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Route
// const productRoutes = require('./Controller/Landingpagecontroller');
// app.use('/api/products', productRoutes);
// // In your main server file (e.g., app.js or index.js)

// app.use('/api', landingPageRoutes);

// // Server start
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const {
  signup,
  googleSignup,
  facebookSignup
} = require('./Controller/Signupcontroller');

const landingPageRoutes = require('./Controller/Landingpagecontroller'); // ✅ FIXED: Import routes

const app = express();
app.use(cors());
app.use(express.json());

const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'public/images')));
// ✅ Signup Routes
app.post('/api/signup', signup);
app.post('/api/google-signup', googleSignup);
app.post('/api/facebook-signup', facebookSignup);

// ✅ Product + Reviews Routes
app.use('/api/products', landingPageRoutes); // Routes are: /api/products/landing & /api/products/reviews

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
