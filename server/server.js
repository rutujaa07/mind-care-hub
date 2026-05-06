const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
// Review Model
const reviewSchema = new mongoose.Schema(
  {
    userName: { type: String, default: "Anonymous" },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    text: { type: String, required: true },
  },
  { timestamps: true }
);
const Review = mongoose.model("Review", reviewSchema);
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // ✅ CHANGED
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // ✅ CHANGED
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected! 🗄️"))
  .catch((err) => console.log("DB connection error:", err));

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const postRoutes = require("./routes/posts");
app.use("/api/posts", postRoutes);

const commentRoutes = require("./routes/comments");
app.use("/api/comments", commentRoutes);

const moodRoutes = require("./routes/moods");
app.use("/api/moods", moodRoutes);

const resourceRoutes = require("./routes/resources");
app.use("/api/resources", resourceRoutes);

const supportRoutes = require("./routes/support");
app.use("/api/support", supportRoutes);

const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

const dmRoutes = require("./routes/dm");
app.use("/api/dm", dmRoutes);

// GET all reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(50);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST new review
app.post("/api/reviews", async (req, res) => {
  try {
    const { userName, rating, text } = req.body;
    const review = new Review({ userName, rating, text });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error("Review save error:", err);
    res.status(500).json({ error: err.message });
  }
});
const statsRoutes = require("./routes/stats");
app.use("/api/stats", statsRoutes);

const profileRoutes = require("./routes/profile");
app.use("/api/profile", profileRoutes);

// GET all reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(50);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST new review
app.post("/api/reviews", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Socket.io
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("send_dm", (data) => {
    io.to(data.roomId).emit("receive_dm", data);
  });
  // Join a room (support request thread)
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Send message
  socket.on("send_message", (data) => {
    console.log("Message received on server:", data);
    io.to(data.roomId).emit("receive_message", data);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
