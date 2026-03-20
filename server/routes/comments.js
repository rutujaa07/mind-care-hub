const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const { protect } = require("../middleware/authMiddleware");

// ========================
// ADD A COMMENT
// ========================
router.post("/:postId", protect, async (req, res) => {
  try {
    const { content, isAnonymous } = req.body;

    const newComment = new Comment({
      postId: req.params.postId,
      userId: req.user.id,
      content,
      isAnonymous,
    });

    await newComment.save();
    res.status(201).json({ message: "Comment added! 🎉", comment: newComment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ========================
// GET ALL COMMENTS FOR A POST
// ========================
router.get("/:postId", protect, async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    // Hide username if anonymous
    const formattedComments = comments.map((comment) => ({
      ...comment._doc,
      username: comment.isAnonymous ? "Anonymous" : comment.userId.username,
    }));

    res.json(formattedComments);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ========================
// DELETE A COMMENT
// ========================
router.delete("/:id", protect, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Only the owner can delete their comment
    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
