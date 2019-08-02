import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RegisterPage() {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
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

	const submitData = () => {
		if (username.length === 0) {
			setErrorText('Please enter a valid username');
		} else if (password.length < 4) {
			setErrorText('Please input a password of at least length 8');
		} else if (password !== verifiedPassword) {
			setErrorText('The passwords do not match');
		} else {
			postSubmit();
		}
	};

	const postSubmit = async () => {
    const response = await fetch('localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    const content = await response.json();
    if (!content.success) {
      setErrorText('Sorry, this user already exists');
    }
  }

  const flipCard = () => {
    setFlipStyle({transform: `rotateY(180deg)`});
  }
  

	return (
		<div className="register-container">
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
