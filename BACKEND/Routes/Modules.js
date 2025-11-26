const express = require("express");
const router = express.Router();
const Module = require("../Models/Module");

// ✅ Get ALL modules
router.get("/", async (req, res) => {
  const modules = await Module.find();
  res.json(modules);
});

// ✅ Get module by ID
router.get("/:id", async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ msg: "Module not found" });

    res.json(module);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;