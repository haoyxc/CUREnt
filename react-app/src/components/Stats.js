import React, { useState, useEffect } from "react";
import { set } from "mongoose";
// const User = require("../../../models/User");

// self.parseJwt = function(token) {
//   var base64Url = token.split('.')[1];
//   var base64 = base64Url.replace('-', '+').replace('_', '/');
//   return JSON.parse(window.atob(base64));
// }

export default function Stats({ user }) {
	const [stats, setStats] = useState({ streak: 5 });
	const [show, setShow] = useState(false);
	console.log(user);

	const getStats = async () => {
		setShow(!show);
		try {
			const response = await fetch("http://localhost:5000/stats/" + user, {
				method: "POST",
				body: JSON.stringify({
					username: user,
				}),
			});
			const responseJSON = await response.json();
			// We should expect the backend to populate the stats from the username
			// console.log(responseJSON);
			setStats(responseJSON.stats);
		} catch (err) {
			console.log("Something incorrect ocurred while getting stats", err, user);
		}
	};

	const findTotalPercent = () => {
		if (stats.accuracy) {
			const keys = Object.keys(stats.accuracy);
			console.log(keys);
			let correct = 0;
			let total = 0;
			for (let i = 0; i < 4; i++) {
				correct += stats.accuracy[keys[i]].correct;
				total += stats.accuracy[keys[i]].total;
			}
		}
	};

	const getPercentage = category => {
		if (stats.accuracy) {
			console.log(stats.accuracy[category]);
			// return stats.accuracy[category].correct / stats.accuracy[category].total;
		}
	};

	console.log(stats);
	return (
		<div>
			<h1>Your Stats</h1>
			<button onClick={() => getStats()}>Show your stats</button>
			{show && (
				<div>
					{!findTotalPercent() ? (
						<h2>You haven't completed a quiz yet. Take a quiz to see your stats!</h2>
					) : (
						<div>
							<h3>Streak: {stats.streak}</h3>
							<h3>Accuracy ({findTotalPercent()}% Overall)</h3>
							{["business", "politics", "science", "world"].map(x => (
								<h3>
									{x}: {getPercentage(x)}%
								</h3>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
