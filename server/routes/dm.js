const express = require("express");
const router = express.Router();
const DM = require("../models/DM");
const { protect } = require("../middleware/authMiddleware");

// START or GET existing conversation
router.post("/start", protect, async (req, res) => {
  try {
    const { recipientId } = req.body;

    // Check if conversation already exists
    let conversation = await DM.findOne({
      participants: { $all: [req.user.id, recipientId] },
    });

    // If not create a new one
    if (!conversation) {
      conversation = new DM({
        participants: [req.user.id, recipientId],
      });
      await conversation.save();
    }

    res.json(conversation);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET all conversations for logged in user
router.get("/inbox", protect, async (req, res) => {
  try {
    const conversations = await DM.find({
      participants: { $in: [req.user.id] },
    })
      .populate("participants", "username")
      .sort({ lastMessageAt: -1 });

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET single conversation messages
router.get("/:id", protect, async (req, res) => {
  try {
    const conversation = await DM.findById(req.params.id)
      .populate("participants", "username")
      .populate("messages.senderId", "username");

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Make sure user is part of this conversation
    if (
      !conversation.participants.some((p) => p._id.toString() === req.user.id)
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(conversation);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// SEND a message
router.post("/:id/message", protect, async (req, res) => {
  try {
    const { message } = req.body;

    const conversation = await DM.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Make sure user is part of this conversation
    if (!conversation.participants.some((p) => p.toString() === req.user.id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    conversation.messages.push({
      senderId: req.user.id,
      message,
    });

    conversation.lastMessage = message;
    conversation.lastMessageAt = Date.now();

    await conversation.save();

    res.json({ message: "Message sent! 🎉" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
