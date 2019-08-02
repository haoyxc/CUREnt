import React, {useState, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import QuizCards from '../components/QuizCards'
import Stats from "../components/Stats";

const parseJwt = token => {
	console.log(token, typeof token);
	var base64Url = token.split(".")[1];
	var base64 = base64Url.replace("-", "+").replace("_", "/");
	return JSON.parse(window.atob(base64));
};

export default function HomePage() {
	const [questions, setQuestions] = useState([]);

<<<<<<< HEAD
	const getAllQuestions = async () => {
		try {
			let response = await fetch("http://localhost:5000/quiz", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			response = await response.json();
			setQuestions(response[Math.floor(Math.random() * 3)]);
		} catch (err) {
			console.log(err);
		}
	};

	const getBusinessQuestions = async () => {
		try {
			let response = await fetch("http://localhost:5000/quiz/business", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			response = await response.json();
			setQuestions(response);
		} catch (err) {
			console.log(err);
		}
	};

	const getPoliticsQuestions = async () => {
		try {
			let response = await fetch("http://localhost:5000/quiz/politics", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			response = await response.json();
			setQuestions(response);
		} catch (err) {
			console.log(err);
		}
	};

	const getTechQuestions = async () => {
		try {
			let response = await fetch("http://localhost:5000/quiz/technology", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			response = await response.json();
			setQuestions(response);
		} catch (err) {
			console.log(err);
		}
	};

	const getWorldQuestions = async () => {
		try {
			let response = await fetch("http://localhost:5000/quiz/world", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			response = await response.json();
			setQuestions(response);
		} catch (err) {
			console.log(err);
		}
	};

	// console.log(localStorage.getItem("token"));

	return (
		<div>
			<h1>HomePage</h1>
			<div style={styles.row}>
				<button onClick={() => getAllQuestions()}>Everything</button>
				<button onClick={() => getBusinessQuestions()}>Business</button>
				<button onClick={() => getTechQuestions()}>Technology</button>
			</div>
			<div style={styles.row}>
				<button onClick={() => getPoliticsQuestions()}>Politics</button>
				<button onClick={() => getWorldQuestions()}>World</button>
			</div>
			{questions.length ? <div>{questions[0].question}</div> : null}
			<Stats user={parseJwt(localStorage.getItem("token")).username} />
		</div>
	);
}

const styles = {
	row: {
		flex: 1,
		alignItems: "center",
	},
	catSel: {
		height: 50,
		width: 40,
		borderRadius: 5,
	},
=======
  const getAllQuestions = async () => {
    try {
      let response = await fetch("http://localhost:5000/quiz", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      response = await response.json();
      // console.log(response);
      setQuestions(response[Math.floor(Math.random() * 3)]);
      // console.log(questions);
    } catch (err) {
      console.log(err);
    }
  };

  const getBusinessQuestions = async () => {
    try {
      let response = await fetch("http://localhost:5000/quiz/business", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      response = await response.json();
      setQuestions(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getPoliticsQuestions = async () => {
    try {
      let response = await fetch("http://localhost:5000/quiz/politics", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      response = await response.json();
      setQuestions(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getTechQuestions = async () => {
    try {
      let response = await fetch("http://localhost:5000/quiz/technology", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      response = await response.json();
      setQuestions(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getWorldQuestions = async () => {
    try {
      let response = await fetch("http://localhost:5000/quiz/world", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      response = await response.json();
      setQuestions(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>HomePage</h1>
      <div style={styles.row}>
        <button onClick={() => getAllQuestions()}>Everything</button>
        <button onClick={() => getBusinessQuestions()}>Business</button>
        <button onClick={() => getTechQuestions()}>Technology</button>
      </div>
      <div style={styles.row}>
        <button onClick={() => getPoliticsQuestions()}>Politics</button>
        <button onClick={() => getWorldQuestions()}>World</button>
      </div>
      {questions.length ? (
        <QuizCards allQuestions={questions} />
      ) : // <div>{questions[0].question}</div>
      null}
      <Stats user={parseJwt(localStorage.getItem("token")).username} />
    </div>);
}

const styles = {
  row: {
    flex: 1,
    alignItems: "center"
  },
  catSel: {
    height: 50,
    width: 40,
    borderRadius: 5
  }
>>>>>>> 1b1da0f4447e84daadfb8eeb27e5172a266c6c7e
};
