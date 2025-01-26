const express = require("express");
const User = require("../models/User");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const { fetctAllUsers, deleteUser, fetchUserById } = require("../controllers/userControllers");

const router = express.Router();

router.get("/", verifyToken, isAdmin, fetctAllUsers);
router.get("/:id", verifyToken, fetchUserById);
router.delete("/:id", verifyToken, isAdmin, deleteUser);

module.exports = router;
