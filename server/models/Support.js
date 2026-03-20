const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    counselorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    initialMessage: {
      type: String,
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["pending", "active", "resolved"],
      default: "pending",
    },
    messages: [
      {
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        senderRole: { type: String },
        message: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Support", supportSchema);
