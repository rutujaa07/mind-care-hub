const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// ========================
// CREATE A POST
// ========================
router.post("/", protect, async (req, res) => {
  try {
    const { content, category, isAnonymous } = req.body;

    const newPost = new Post({
      userId: req.user.id,
      content,
      category,
      isAnonymous,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created! 🎉", post: newPost });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ========================
// GET ALL POSTS
// ========================
router.get("/", protect, async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const posts = await Post.find(filter)
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    // Hide username if anonymous
    const formattedPosts = posts.map((post) => ({
      ...post._doc,
      userId: post.userId._id,
      username: post.isAnonymous ? "Anonymous" : post.userId.username,
    }));

    res.json(formattedPosts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ========================
// LIKE A POST
// ========================
router.put("/like/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // If already liked — unlike it
    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    res.json({ message: "Like updated!", likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ========================
// DELETE A POST (Admin only)
// ========================
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ========================
// FLAG A POST (Admin only)
// ========================
router.put("/flag/:id", protect, adminOnly, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.isFlagged = !post.isFlagged;
    await post.save();
    res.json({ message: "Post flag updated!", isFlagged: post.isFlagged });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
