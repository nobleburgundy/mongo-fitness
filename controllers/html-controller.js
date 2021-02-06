const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

// Export the routes for use in server.js
module.exports = router;
