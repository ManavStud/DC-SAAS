const express = require("express");
const router = express.Router();

// Import the controller for handling requests
const {
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  profile,
  registerUser,
  updateUser,
} = require("../controllers/users.js");
const auth = require("../config/middleware.js");

// Define the routes for the users resource
// Getting all
router.get("/", getUsers);

// Creating one
router.post("/register", registerUser);

// Log in
router.post("/login", loginUser);

router.use(auth);
// Profile
router.get("/profile", profile);

// Getting one
router.get("/:id", getUser);

// Updating one
router.put("/:id", updateUser);

// Deleting one
router.delete("/:id", deleteUser);

module.exports = router;
