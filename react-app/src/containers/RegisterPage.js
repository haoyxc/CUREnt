import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

export default function RegisterPage() {
	const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loginUsername, setLoginUsername ] = useState('');
  const [ loginPassword, setLoginPassword ] = useState('');
	const [ verifiedPassword, setVerifiedPassword ] = useState('');
	const [ errorText, setErrorText ] = useState('');
	const [ flipStyle, setFlipStyle ] = useState({});

	const handleUsername = (event) => {
		setUsername(event.target.value);
	};

	const handlePassword = (event) => {
		setPassword(event.target.value);
	};

	const handleVerifiedPassword = (event) => {
		setVerifiedPassword(event.target.value);
  };
  
  const handleLoginUsername = (event) => {
    setLoginUsername(event.target.value);
  }

  const handleLoginPassword = (event) => {
    setLoginPassword(event.target.value);
  }

	const submitData = () => {
		if (username.length === 0) {
			setErrorText('Please enter a valid username');
		} else if (password.length < 4) {
			setErrorText('Please input a password of at least length 8');
		} else if (password !== verifiedPassword) {
			setErrorText('The passwords do not match');
		} else {
			postSubmit().catch((e) => {
				setErrorText('Failed to create user, please try again.');
				console.log(e);
			});
		}
	};

	const postSubmit = async () => {




		const response = await fetch('http://localhost:5000/signup', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		});
		const content = await response.json();
		if (!content.success) {
			setErrorText('Sorry, this user already exists');
		}
  };
  
  const postLogin = async () => {
    
  }

	const flipCard = () => {
		setFlipStyle({ transform: `rotateY(180deg)` });
	};

	return (
		<div className="register-container">
			<nav className="navbar navbar-light bg-light">
				<a className="navbar-brand">Navbar</a>
				
					<input type = "text" placeholder = "username" className="form-control mr-sm-2" value = {loginUsername} onChange={(e) => handleLoginUsername(e)}/>
					<input type = "password" placeholder = "password" className="form-control mr-sm-2" value = {loginPassword} onChange={(e) => handleLoginPassword(e)}/>
					<button onClick={() => postLogin()}>Login</button>
				
			</nav>
			<div className="flip-card">
				<div className="flip-card-inner" style={flipStyle}>
					<div className="flip-card-front">
						<button onClick={() => flipCard()}>Switch card</button>
					</div>
					<div className="flip-card-back">
						<h4>Register</h4>
						<p>{errorText}</p>
						<input
							type="text"
							className="form-control"
							placeholder="username"
							value={username}
							onChange={(e) => handleUsername(e)}
						/>
						<input
							type="password"
							className="form-control"
							placeholder="password"
							value={password}
							onChange={(e) => handlePassword(e)}
						/>
						<input
							type="password"
							className="form-control"
							placeholder="verify password"
							value={verifiedPassword}
							onChange={(e) => handleVerifiedPassword(e)}
						/>
						<button onClick={() => submitData()}>Submit</button>
					</div>
				</div>
			</div>
		</div>
	);
}
