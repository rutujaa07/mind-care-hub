const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Mood = require("../models/Mood");
const Support = require("../models/Support");

router.get("/", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCounselors = await User.countDocuments({ role: "counselor" });
    const totalPosts = await Post.countDocuments();
    const totalSupportResolved = await Support.countDocuments({
      status: "resolved",
    });

    res.json({
      totalUsers,
      totalCounselors,
      totalPosts,
      totalSupportResolved,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
