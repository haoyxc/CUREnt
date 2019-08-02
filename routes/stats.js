const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// User Mongo
const User = require("../models/User");
const Stat = require("../models/Stat");

router.post("/stats/:username", (req, res) => {
	// console.log("This is the logged in user:", req.params.username);
	User.findOne({ username: req.params.username })
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
							{ username: req.params.username },
							{ stats: newStats._id },
							err => {
								if (err) console.log(err);
								return res.send({ stats: newStats });
							}
						);
					});
				} else {
					return res.send({ stats: user.stats });
				}
			}
		});
});

// router.post("/stats/new/:username/:correct/:category", (req, res) => {
// 	User.findOne({ username: req.params.username }).exec((err, user) => {
// 		Stat.findOne({ _id: user.stats }, (err2, stat) => {
// 			// if(stat){
// 			//     let correct = stat.accuracy[req.params.category].correct;
// 			// let total = stat.accuracy[req.params.category].total;
// 			// if(req.params.correct === 'true'){
// 			//     correct += 1;
// 			// }
// 			// total += 1;
// 			console.log("pls send help", stat);
// 			if (stat) {
// 				let newObj = stat;
// 				newObj.accuracy[req.params.category].correct += 1;
// 				newObj.accuracy[req.params.category].total += 1;

//                 Object.assign(stat, )

// 				Stat.findOneAndUpdate(stat, newObj, () => {
// 					return res.send({ fuck: "yeah" });
// 				});
// 			}

// 			// accuracy['business']
// 			// Stat.findOneAndUpdate({_id: user.id}, {accuracy[req.params.category].correct: correct})
// 			// }
// 		});
// 	});
// 	// return res.send({ success: "no" });
// });

module.exports = router;
