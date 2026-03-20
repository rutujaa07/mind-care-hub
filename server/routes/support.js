const express = require("express");
const router = express.Router();
const Support = require("../models/Support");
const { protect, counselorOnly } = require("../middleware/authMiddleware");

// USER — Create support request
router.post("/", protect, async (req, res) => {
  try {
    const { initialMessage, isAnonymous } = req.body;

    const newRequest = new Support({
      userId: req.user.id,
      initialMessage,
      isAnonymous,
    });

    await newRequest.save();
    res
      .status(201)
      .json({ message: "Support request sent! 🎉", request: newRequest });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// COUNSELOR — Get all support requests
router.get("/", protect, counselorOnly, async (req, res) => {
  try {
    const requests = await Support.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// USER — Get their own requests
router.get("/my", protect, async (req, res) => {
  try {
    const requests = await Support.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// COUNSELOR/USER — Get single request with messages
router.get("/:id", protect, async (req, res) => {
  try {
    const request = await Support.findById(req.params.id)
      .populate("userId", "username")
      .populate("counselorId", "username");
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// COUNSELOR — Reply to request
router.post("/:id/reply", protect, counselorOnly, async (req, res) => {
  try {
    const { message } = req.body;
    const request = await Support.findById(req.params.id);

    request.messages.push({
      senderId: req.user.id,
      senderRole: "counselor",
      message,
    });

    request.counselorId = req.user.id;
    await request.save();

    res.json({ message: "Reply sent! 🎉" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// USER — Reply to thread
router.post("/:id/user-reply", protect, async (req, res) => {
  try {
    const { message } = req.body;
    const request = await Support.findById(req.params.id);

    request.messages.push({
      senderId: req.user.id,
      senderRole: "user",
      message,
    });

    await request.save();
    res.json({ message: "Message sent! 🎉" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// COUNSELOR — Update status
router.put("/:id/status", protect, counselorOnly, async (req, res) => {
  try {
    const { status } = req.body;
    await Support.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: "Status updated!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
