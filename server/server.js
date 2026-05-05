const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

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

const profileRoutes = require("./routes/profile");
app.use("/api/profile", profileRoutes);

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
