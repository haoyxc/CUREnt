const mongoose = require("mongoose");
const connect = process.env.MONGODB_URI;
// console.log(process.env.MONGODB_URI);
// const Stat = require("./Stat");

mongoose.connect(connect);

const statSchema = new mongoose.Schema({
	streak: {
		type: Number,
		required: true,
	},
	accuracy: {
		science: {
			correct: Number,
			total: Number,
		},
		world: {
			correct: Number,
			total: Number,
		},
		politics: {
			correct: Number,
			total: Number,
		},
		business: {
			correct: Number,
			total: Number,
		},
	},
});

const Stat = mongoose.model("Stat", statSchema);
module.exports = Stat;
