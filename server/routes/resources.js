const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");
const {
  protect,
  adminOnly,
  counselorOnly,
} = require("../middleware/authMiddleware");

// GET all resources
router.get("/", protect, async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ADD resource (counselor/admin)
router.post("/", protect, counselorOnly, async (req, res) => {
  try {
    const { title, type, content, link } = req.body;
    const newResource = new Resource({ title, type, content, link });
    await newResource.save();
    res
      .status(201)
      .json({ message: "Resource added! 🎉", resource: newResource });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE resource (admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: "Resource deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
