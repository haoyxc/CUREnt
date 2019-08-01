const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const crypto = require("crypto");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const FacebookStrategy = require("passport-facebook");
const TwitterStrategy = require("passport-twitter");

const models = require("./models/models");
const User = models.User;
let app = express();

// Ensure there is a pasword
if (!process.env.SECRET) {
	console.log("Error: no secret");
	process.exit(1);
}

// Middleware Protocols
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: process.env.MY_SECRET }));

// Passport stuff
app.use(
	session({
		secret: process.env.SECRET,
		resave: true,
		saveUninitialized: true,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

function hashPassword(password) {
	let hash = crypto.createHash("sha256");
	hash.update(password);
	return hash.digest("hex");
}

passport.serializeUser(function(user, done) {
	done(null, user._id);
});
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use(
	new LocalStrategy(function(username, password, done) {
		// Find the user with the given username
		User.findOne({ username: username }, function(err, user) {
			// if there's an error, finish trying to authenticate (auth failed)
			if (err) {
				console.log(err);
				return done(err);
			}
			// if no user present, auth failed
			if (!user) {
				console.log(user);
				return done(null, false);
			}
			// if passwords do not match, auth failed
			if (user.password !== hashPassword(password)) {
				return done(null, false);
			}
			// auth has has succeeded
			return done(null, user);
		});
	})
);

module.exports = app;
