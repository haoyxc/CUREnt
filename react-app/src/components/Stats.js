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
    console.log("we went in");
    setShow(!show);
    try {
      const response = await fetch("http://localhost:5000/stats", {
        method: "POST",
        body: JSON.stringify({
          username: user
        })
      });
      const responseJSON = await response.json();
      // We should expect the backend to populate the stats from the username
      console.log(responseJSON);
      setStats(responseJSON);
    } catch (err) {
      console.log("Something incorrect ocurred while getting stats", err, user);
    }
  };
  console.log("we went in", show);
  return (
    <div className="stats-container">
      <h1 className="stats-header">Your Stats</h1>
      <button onClick={() => getStats()}>Show your stats</button>
      {show && (
        <div className="stats-details">
          {!stats ? (
            <h2>You haven't completed a quiz yet. Take a quiz to see your stats!</h2>
          ) : (
            <div>
              <h3>Streak: {stats.streak}</h3>
              <h3>Accuracy ({5}% Overall)</h3>
              {["Business", "Politics", "Technology", "World"].map(x => (
                <h3>
                  {x}: {20}%
                </h3>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
