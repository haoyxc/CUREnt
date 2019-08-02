import React from 'react';
import ReactDOM from 'react-dom';
import RegisterPage from './containers/RegisterPage';
import HomePage from './containers/HomePage';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const checkIfLoggedIn = async () => {
	const userResponse = await fetch('http://localhost:5000/user', {
		method: 'GET',
		headers: {
			Accept: 'application/json'
		}
	});
	const userContent = await userResponse.json();
	if (userContent.loggedIn) {
		return true;
	}
	return false;
};

const routing = (
	<Router>
        <Route path="/register" component={RegisterPage} />
		{checkIfLoggedIn() && <Route path="/homepage" component={HomePage} />}
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
