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
      "SELECT UID, FirstName, LastName, Email, Contact, Address, CreatedAt FROM users"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete user
const deleteUser = async (req, res) => {
  const conn = await db.getConnection(); // if using pool
  try {
    await conn.beginTransaction();

    const userId = req.params.id;

    // Delete dependent records first
    await conn.query("DELETE FROM cart WHERE UID = ?", [userId]);
    await conn.query("DELETE FROM wishlist WHERE UID = ?", [userId]);
    await conn.query("DELETE FROM orders WHERE UID = ?", [userId]); // if you have orders table

    // Now delete the user
    const [result] = await conn.query("DELETE FROM users WHERE UID = ?", [userId]);

    if (result.affectedRows === 0) {
      await conn.rollback();
      return res.status(404).json({ message: "User not found" });
    }

    await conn.commit();
    res.json({ message: "User and related records deleted successfully" });
  } catch (error) {
    await conn.rollback();
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    conn.release();
  }
};


module.exports = {
  getAllUsers,
  deleteUser,
};
