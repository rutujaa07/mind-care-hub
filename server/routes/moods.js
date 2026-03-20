const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");
const { protect } = require("../middleware/authMiddleware");

// ========================
// LOG A MOOD
// ========================
router.post("/", protect, async (req, res) => {
  try {
    const { mood, note } = req.body;

    const newMood = new Mood({
      userId: req.user.id,
      mood,
      note,
    });

    await newMood.save();
    res.status(201).json({ message: "Mood logged! 🎉", mood: newMood });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ========================
// GET MY MOOD HISTORY
// ========================
router.get("/", protect, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(30); // Last 30 entries

    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ========================
// GET MOOD SUMMARY (weekly average)
// ========================
router.get("/summary", protect, async (req, res) => {
  try {
    // Get moods from last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const moods = await Mood.find({
      userId: req.user.id,
      createdAt: { $gte: sevenDaysAgo },
    });

    if (moods.length === 0) {
      return res.json({ message: "No moods logged this week" });
    }

    // Calculate average
    const average = moods.reduce((sum, m) => sum + m.mood, 0) / moods.length;

    res.json({
      totalEntries: moods.length,
      weeklyAverage: average.toFixed(1),
      moods,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
