import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";
import Axios from "axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [flipStyle, setFlipStyle] = useState({});
  const [loggedIn, setLogin] = useState(false);

  const handleUsername = event => {
    setUsername(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const handleVerifiedPassword = event => {
    setVerifiedPassword(event.target.value);
  };

  const handleLoginUsername = event => {
    setLoginUsername(event.target.value);
  };

  const handleLoginPassword = event => {
    setLoginPassword(event.target.value);
  };

  const submitData = () => {
    if (username.length === 0) {
      setErrorText("Please enter a valid username");
    } else if (password.length < 4) {
      setErrorText("Please input a password of at least length 4");
    } else if (password !== verifiedPassword) {
      setErrorText("The passwords do not match");
    } else {
      postSubmit().catch(e => {
        setErrorText("Failed to create user, please try again.");
        console.log(e);
      });
    }
  };

  const postSubmit = async () => {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    const content = await response.json();
    if (!content.success) {
      setErrorText("Sorry, this user already exists");
    } else {
      setErrorText("Your account was created successfuly! Please log in.");
      setUsername('');
      setPassword('');
      setVerifiedPassword('');
    }
  };

  const postLogin = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword
      })
    });
    const content = await response.json();
    console.log(content);
    if (!content.success) {
      setErrorText("Wrong username or password");
    } else {
      localStorage.setItem("token", content.token);
      setLogin(true);
    }
  };

  const flipCard = () => {
    setFlipStyle({ transform: `rotateY(180deg)` });
  };

  if (loggedIn) {
    return <Redirect to="/homepage" />;
  }

  return (
    <div className="register-container">
      <nav className="navbar navbar-light bg-light" id="register-navbar">
        <a className="navbar-brand" className="header-logo">
          CURent.
        </a>
        <div className="login-wrapper">
          <input
            type="text"
            placeholder="username"
            className="form-control mr-sm-2"
            value={loginUsername}
            onChange={e => handleLoginUsername(e)}
          />
          <input
            type="password"
            placeholder="password"
            className="form-control mr-sm-2"
            value={loginPassword}
            onChange={e => handleLoginPassword(e)}
          />
          <button
            onClick={() =>
              postLogin().catch(e => {
                setErrorText("Login request failed, please try again.");
              })
            }
            className="login-btn"
          >
            Login
          </button>
        </div>
      </nav>
      <div className="flip-card">
        <div className="flip-card-inner" style={flipStyle}>
          <div className="flip-card-front">
            <h3>Question 1</h3>
            <hr />
            <h4>
              The third round of Democratic presidential debates will take place in
              _______?
            </h4>
            <div className="answerBlock">
              <h5>
                <button className="emptyButton2" onClick={() => flipCard()}>
                  A) New York
                </button>
              </h5>
              <h5>
                <button className="emptyButton2" onClick={() => flipCard()}>
                  B) California
                </button>
              </h5>
              <h5>
                <button className="emptyButton2" onClick={() => flipCard()}>
                  C) Michigan
                </button>
              </h5>
              <h5>
                <button className="emptyButton2" onClick={() => flipCard()}>
                  D) Pennsylvania
                </button>
              </h5>
            </div>
          </div>
          <div className="flip-card-back">
            <h3>Register to find out!</h3>
            <hr />
            <p>{errorText}</p>
            <input
              type="text"
              className="form-control"
              placeholder="username"
              value={username}
              onChange={e => handleUsername(e)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={e => handlePassword(e)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="verify password"
              value={verifiedPassword}
              onChange={e => handleVerifiedPassword(e)}
            />
            <br />
            <button onClick={() => submitData()} className="register-submit-btn">
              Submit
            </button>
          </div>
        </div>
      </div>
      <p>
        Don't have an account?{" "}
        <button className="emptyButton" onClick={() => flipCard()}>
          Register.
        </button>
      </p>
    </div>
  );
}
