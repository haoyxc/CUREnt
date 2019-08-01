const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	correctAnswer: {
		type: String,
		required: true,
	},
	wrongAnswers: {
		type: [String],
		required: true,
	},
});

const Question = mongoose.model("Question", questionSchema);
mode.exports = Question;
