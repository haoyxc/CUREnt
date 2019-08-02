import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import QuizCards from "../components/QuizCards";

export default function HomePage() {
  const [questions, setQuestions] = useState([]);

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
    <div className="homepage-container">
      <h1>HomePage</h1>
      <div style={styles.row} className="homepage-btns">
        <button onClick={() => getAllQuestions()}>Everything</button>
        <button onClick={() => getBusinessQuestions()}>Business</button>
        <button onClick={() => getTechQuestions()}>Technology</button>
        {/* </div>
      <div style={styles.row}> */}
        <button onClick={() => getPoliticsQuestions()}>Politics</button>
        <button onClick={() => getWorldQuestions()}>World</button>
      </div>
      <div className="question-cards">
        {questions.length ? (
          <QuizCards allQuestions={questions} />
        ) : // <div>{questions[0].question}</div>
        null}
      </div>
    </div>
  );
}

const styles = {
  row: {
    flex: 1,
    justifyContent: "center"
  },
  catSel: {
    height: 50,
    width: 40,
    borderRadius: 5
  }
};
