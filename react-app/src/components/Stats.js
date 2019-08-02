import React, { useState, useEffect } from "react";
// const User = require("../../../models/User");

// self.parseJwt = function(token) {
//   var base64Url = token.split('.')[1];
//   var base64 = base64Url.replace('-', '+').replace('_', '/');
//   return JSON.parse(window.atob(base64));
// }

export default function Stats({ user }) {
  const [stats, setStats] = useState({ streak: 5 });

  // useEffect(() =>, [])

  const getStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/stats", {});
      const responseJSON = await response.json();
      // We should expect the backend to populate the stats from the username
      setStats(responseJSON);
    } catch (err) {
      console.log("Something incorrect ocurred while getting stats", err);
    }
  };

  return (
    <div className="stats-container">
      <h1 className="stats-header">Your Stats</h1>
      {!stats ? (
        <h2 className="stats-details">
          You haven't completed a quiz yet. Take a quiz to see your stats!
        </h2>
      ) : (
        <div>
          <h3 className="stats-details">Streak: {stats.streak}</h3>
          <h3 className="stats-details">Accuracy ({5}% Overall)</h3>
          {["Business", "Politics", "Technology", "World"].map(x => (
            <h3 className="stats-details">
              {x}: {20}%
            </h3>
          ))}
        </div>
      )}
    </div>
  );
}
