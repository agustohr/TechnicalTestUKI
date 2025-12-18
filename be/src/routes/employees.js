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

// GetById
router.get("/:id", async (req, res) => {
  try {
    const data = await Employee.findOne({ id: req.params.id });
    if (!data) return res.status(404).json({ message: "Employee tidak ditemukan" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add
router.post("/", async (req, res) => {
  try {
    const { id, name, department } = req.body;

    if (!id || !name || !department) {
      return res.status(400).json({ message: "id, name, department wajib diisi" });
    }

    const emp = await Employee.create({ id, name, department });
    res.status(201).json({ message: `Employee atas nama ${emp.name} berhasil ditambahkan` });
  } catch (err) {
    // duplicate key error (unique id)
    if (err.code === 11000) {
      return res.status(409).json({ message: "Employee ID sudah ada" });
    }
    res.status(500).json({ message: err.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const currentId = req.params.id;
    const { id: newId, name, department } = req.body;

    if (!newId || !name || !department) {
      return res.status(400).json({ message: "id, name, department wajib diisi" });
    }

    const emp = await Employee.findOneAndUpdate(
      { id: currentId },
      { $set: { ...(newId ? { id: newId } : {}), ...(name ? { name } : {}), ...(department ? { department } : {}) } },
      { new: true }
    );

    if (!emp) return res.status(404).json({ message: "Employee tidak ditemukan" });

    res.json({ message: `Employee atas nama ${emp.name} berhasil diubah` });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "Employee ID sudah dipakai" });
    res.status(500).json({ message: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const emp = await Employee.findOneAndDelete({ id: req.params.id });
    if (!emp) return res.status(404).json({ message: "Employee tidak ditemukan" });
    res.json({ message: `Employee atas nama ${emp.name} berhasil dihapus` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
