const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["article", "exercise", "helpline"],
      default: "article",
    },
    content: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
