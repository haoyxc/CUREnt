const mongoose = require("mongoose");
const connect = process.env.MONGODB_URI;

const Stat = require("./Stat");

mongoose.connect(connect);

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	interests: {
		type: [String],
	},
	stats: {
		type: mongoose.Schema.ObjectId,
		ref: Stat,
	},
});

let User = mongoose.model("User", userSchema);
module.exports = User;
