const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { protect } = require("../middleware/authMiddleware");

// GET any user's profile
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get their public posts
    const posts = await Post.find({
      userId: req.params.id,
      isAnonymous: false,
    }).sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// UPDATE own bio
router.put("/update/bio", protect, async (req, res) => {
  try {
    const { bio } = req.body;
    await User.findByIdAndUpdate(req.user.id, { bio });
    res.json({ message: "Bio updated! 🎉" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
