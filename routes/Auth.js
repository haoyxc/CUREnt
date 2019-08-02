const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// User Mongo
const User = require("../models/User");

// const secret = process.env.SECRET;
// const isAuthenticated = jws.isAuthenticated(secret);

//signToken a user and return token
//150 is the  access seconds of session
// app.get("/setAuth", function(req, res) {
// 	var token = jws.signToken({ email: "test@test.com", name: "test" }, secret, 150);
// 	res.json({ token: token });
// });

// //auth token and set req.user  or  return 401 code
// app.get("/getWithAuth", isAuthenticated, function(req, res) {
// 	res.send(req.user);
// });

function hashPassword(password) {
	let hash = crypto.createHash("sha256");
	hash.update(password);
	return hash.digest("hex");
}

module.exports = function(passport) {
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

	// router.post(
	// 	"/login",
	// 	passport.authenticate("local", {
	// 		successRedirect: "/login/success",
	// 		failureRedirect: "/login/failure",
	// 	})
	// );

	router.post("/login", async (req, res) => {
		const found = User.findOne({ username: req.body.username }, function(err, user) {
			// if there's an error, finish trying to authenticate (auth failed)
			// if no user present, auth failed
			if (err || !user) {
				console.log(err);
				return res.send({ success: false });
			}

			// if (!user) {
			// 	console.log(user);
			// 	res.send({ success: false });
			// }

			// if passwords do not match, auth failed
			if (user.password !== hashPassword(req.body.password)) {
				console.log("Passwords don't match");
			} else {
				return res.json({
					token: jwt.sign({ username: user.username }, process.env.SECRET),
					success: true,
				});
			}
			// auth has has succeeded
			// username = user.username;
			// hashedPassword = user.password;
			// console.log(user);
			res.send({ success: false });
			return user;
		});
	});

	router.get("/user", async (req, res) => {
		// console.log(req.user);
		// if (req.user) {
		// 	res.send({ loggedIn: true });
		// } else {
		// 	res.send({ loggedIn: false });
		// }
		return jwt.verify(req.body.token, process.env.SECRET);
	});

	// router.get("/login/success", (req, res) => {
	// 	res.json({ success: true });
	// });

	// router.get("/login/failure", (req, res) => {
	// 	res.json({ success: false });
	// });

	return router;
};
