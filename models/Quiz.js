const mongoose = require("mongoose");
const Question = require("./Question");

const quizSchema = new mongoose.Schema({
	questions: {
		type: [mongoose.Schema.ObjectId],
		ref: Question,
		required: true,
	},
});

const Quiz = mongoose.model("Quiz", quizSchema);
mode.exports = Quiz;
