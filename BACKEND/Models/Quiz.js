const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: Number, required: true }
});

module.exports = mongoose.model("Quiz", QuizSchema);