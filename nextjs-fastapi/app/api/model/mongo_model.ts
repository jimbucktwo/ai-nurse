import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  age: String,
  gender: String,
  symptoms: String,
  pre_diagnosis: [String],
  severityScore: String,
  possible_remedy: [String],
  // createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Report ||
  mongoose.model("Report", ReportSchema, "Report");
