const express = require("express");
const router = express.Router();
const db = require("../db");
const {
  getAllUsers,
 
  deleteUser
} = require("../Controller/userController");


router.get("/", getAllUsers);

router.delete("/:id", deleteUser);

module.exports = router;
