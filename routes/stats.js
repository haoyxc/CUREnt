const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");

// User Mongo
const User = require("../models/User");
const Stat = require("../models/Stat");

router.post("/stats", (req, res) => {
	console.log("This is the logged in user:", req.body);
	User.findOne({ username: req.body.username })
		.populate("stats")
		.exec((err, user) => {
			if (user) {
				if (!user.stats) {
					const initial = { correct: 0, total: 0 };
					const newStats = new Stat({
						streak: 0,
						accuracy: {
							science: initial,
							world: initial,
							politics: initial,
							business: initial,
						},
					});
					newStats.save(() => {
						User.updateOne(
							{ username: req.body.username },
							{ stats: newStats._id },
							err => {
								if (err) console.log(err);
								return res.send({ stats: newStats, populated: false });
							}
						);
					});
				} else {
					return res.send({ stats: user.stats, populated: true });
				}
			}
		});
});

module.exports = router;
