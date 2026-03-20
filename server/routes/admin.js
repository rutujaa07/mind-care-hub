const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Support = require("../models/Support");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET all users
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE user
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET stats
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();
    const totalRequests = await Support.countDocuments();
    const flaggedPosts = await Post.countDocuments({ isFlagged: true });

    res.json({
      totalUsers,
      totalPosts,
      totalRequests,
      flaggedPosts,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
