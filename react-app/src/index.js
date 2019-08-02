import React from "react";
import ReactDOM from "react-dom";
import RegisterPage from "./containers/RegisterPage";
import HomePage from "./containers/HomePage";
import { Route, Link, Redirect, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import jwt from "jsonwebtoken";

const checkIfLoggedIn = async () => {
	const token = localStorage.getItem("token");
	// if (token) {
	// 	return fetch("http://localhost/5000/user", {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Accept: "application/json",
	// 			Authorization: `Bearer ${token}`,
	// 		},
	// 		body: { token },
	// 	})
	// 		.then(resp => resp.json())
	// 		.then(data => {
	// 			if (data.messsage) {
	// 				localStorage.removeItem("token");
	// 			} else {
	// 				// di;
	// 				console.log("we #did it");
	// 			}
	// 		});
	// }
	return await jwt.verify(token, "PEANUT BUTTER AND JELLY");
};

const routing = (
	<Router>
		<Route path="/register" component={RegisterPage} />
		<Route
			exact
			path="/homepage"
			render={() => (checkIfLoggedIn() ? <HomePage /> : <Redirect to="/register" />)}
		/>
	</Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
