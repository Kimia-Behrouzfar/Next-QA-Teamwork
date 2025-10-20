import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Answer = mongoose.models.Answer || mongoose.model("Answer", answerSchema);

export default Answer;
