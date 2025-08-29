// const db = require("../db");

// // ✅ Get all users
// const getAllUsers = async (req, res) => {
//   try {
//     const [rows] = await db.query(
//       "SELECT UID AS id, FirstName, LastName, Email, Contact, Address, CreatedAt FROM users"
//     );
//     res.json(rows);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Get single user by ID
// const getUserById = async (req, res) => {
//   try {
//     const [rows] = await db.query(
//       "SELECT UID AS id, FirstName, LastName, Email, Contact, Address, CreatedAt FROM users WHERE UID = ?",
//       [req.params.id]
//     );
//     if (rows.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(rows[0]);
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Create a new user
// const createUser = async (req, res) => {
//   try {
//     const { FirstName, LastName, Email, PasswordHash, Contact, Address } = req.body;
//     if (!FirstName || !LastName || !Email || !PasswordHash) {
//       return res.status(400).json({ message: "FirstName, LastName, Email, and PasswordHash are required" });
//     }

//     const [result] = await db.query(
//       "INSERT INTO users (FirstName, LastName, Email, PasswordHash, Contact, Address, CreatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW())",
//       [FirstName, LastName, Email, PasswordHash, Contact || null, Address || null]
//     );

//     res.status(201).json({ message: "User created", userId: result.insertId });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Update user
// const updateUser = async (req, res) => {
//   try {
//     const { FirstName, LastName, Email, Contact, Address } = req.body;

//     const [result] = await db.query(
//       "UPDATE users SET FirstName = ?, LastName = ?, Email = ?, Contact = ?, Address = ? WHERE UID = ?",
//       [FirstName, LastName, Email, Contact, Address, req.params.id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ message: "User updated successfully" });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Delete user
// const deleteUser = async (req, res) => {
//   try {
//     const [result] = await db.query("DELETE FROM users WHERE UID = ?", [
//       req.params.id,
//     ]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Export all controllers
// module.exports = {
//   getAllUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser,
// };
const db = require("../db");

// ✅ Get all users
const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT UID AS id, FirstName, LastName, Email, Contact, Address, CreatedAt FROM users"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get single user by ID
const getUserById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT UID AS id, FirstName, LastName, Email, Contact, Address, CreatedAt FROM users WHERE UID = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Create a new user
const createUser = async (req, res) => {
  try {
    const { FirstName, LastName, Email, PasswordHash, Contact, Address } = req.body;

    if (!FirstName || !LastName || !Email || !PasswordHash) {
      return res
        .status(400)
        .json({ message: "FirstName, LastName, Email, and PasswordHash are required" });
    }

    // Check if email already exists
    const [existingUser] = await db.query("SELECT UID FROM users WHERE Email = ?", [Email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const [result] = await db.query(
      "INSERT INTO users (FirstName, LastName, Email, PasswordHash, Contact, Address, CreatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW())",
      [FirstName, LastName, Email, PasswordHash, Contact || null, Address || null]
    );

    res.status(201).json({ message: "User created successfully", userId: result.insertId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update user
const updateUser = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Contact, Address } = req.body;

    const [result] = await db.query(
      "UPDATE users SET FirstName = ?, LastName = ?, Email = ?, Contact = ?, Address = ? WHERE UID = ?",
      [FirstName, LastName, Email, Contact, Address, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete user
const deleteUser = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM users WHERE UID = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Export all controllers
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
