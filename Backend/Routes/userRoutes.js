const express = require("express");
const router = express.Router();
const {
  getAllUsers,
 
  deleteUser
} = require("../Controller/userController");


// Routes
router.get("/", getAllUsers);

router.delete("/:id", deleteUser);

module.exports = router;
