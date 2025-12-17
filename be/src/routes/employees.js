const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// GetAll
router.get("/", async (_req, res) => {
  try {
    const data = await Employee.find().sort({ id: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
