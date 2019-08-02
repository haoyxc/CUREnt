const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  questions: [
    {
      question: String,
      correctAnswer: String,
      wrongAnswers: [String],
      sourceLink: String
    }
  ],
  date: Date,
  category: {
    type: String,
    default: "all"
  }
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
