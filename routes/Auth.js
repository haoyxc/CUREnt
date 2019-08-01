const express = require("express");
const router = express.Router();
const crypto = require("crypto");

// User Mongo
const User = require("./models/User");

function hashPassword(password) {
	let hash = crypto.createHash("sha256");
	hash.update(password);
	return hash.digest("hex");
}

module.exports = function(passport) {
	// Signup post
	router.post("/signup", async (req, res) => {
		const found = await User.findOne({ username: req.body.username }, (err, user) => {
			if (!err && user) {
				return user;
			}
		});
		if (!found) {
			const newUser = new User({
				username: req.body.username,
				password: req.body.password,
			});
			newUser.save(err => console.log(err));
		} else {
			return { success: false, error: "there is an existing user silly billy" };
		}
	});

	return router;
};