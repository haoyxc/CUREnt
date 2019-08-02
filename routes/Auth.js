const express = require("express");
const router = express.Router();
const crypto = require("crypto");

// User Mongo
const User = require("../models/User");

function hashPassword(password) {
	let hash = crypto.createHash("sha256");
	hash.update(password);
	return hash.digest("hex");
}

module.exports = function(passport) {
	// Signup post

	// router.get("/", (req, res) => {
	// 	res.send("hi2");
	// });

	router.post("/signup", async (req, res) => {
		console.log("in here to sign up dad");
		const found = await User.findOne({ username: req.body.username }, (err, user) => {
			if (!err && user) {
				return user;
			}
		});
		if (!found) {
			const newUser = new User({
				username: req.body.username,
				password: hashPassword(req.body.password),
			});
			newUser.save(() => console.log("bitch we saved"));
			res.send({ success: true, error: "none" });
		} else {
			res.send({ success: false, error: "there is an existing user silly billy" });
		}
	});

	// router.post("/login", (req, res) => {
	// 	console.log("I'm here to log in, sir");
	// 	User.findOne({ username: req.body.username, password: hashPassword(req.body.password) }, () => {

	// 	});
	// });

	router.post(
		"/login",
		passport.authenticate("local", {
			successRedirect: "/login/success",
			failureRedirect: "/login/failure",
		})
	);

	router.get("/login/success", (req, res) => {
		res.json({ success: true });
	});

	router.get("/login/failure", (req, res) => {
		res.json({ success: false });
	});

	return router;
};
