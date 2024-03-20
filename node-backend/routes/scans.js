const express = require("express");
const router = express.Router();

// Import the controller for handling requests
const {
  getScans,
  createScan,
  getAndroidScans,
} = require("../controllers/scans.js");

// Define the routes for the users resource

// Getting all android scans
router.get("/android/:domain/:tool/:id", getAndroidScans);

// Getting all
router.get("/:domain/:tool/:id", getScans);

// Create a scan
router.post("/", createScan);

module.exports = router;
