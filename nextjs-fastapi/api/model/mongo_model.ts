import mongoose from "mongoose";

const ChatSummarySchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  pre_diagnosis: {
    type: [String],
    required: true,
  },
  severityScore: {
    type: Number,
    required: true,
  },
  possible_remedy: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Safe export for Next.js hot-reload
export default mongoose.models.ChatSummary ||
  mongoose.model("ChatSummary", ChatSummarySchema);
