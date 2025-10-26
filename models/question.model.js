import mongoose from "mongoose";

const SkillsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.models.Question || mongoose.model("Question", SkillsSchema);

export default Question;
