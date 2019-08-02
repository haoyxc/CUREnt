import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
// import Quiz from "../components/Quiz";
import QuizCards from "../components/QuizCards";
import Stats from "../components/Stats";
import QuizCardsPlaceholder from "../components/QuizCardsPlaceholder";
import Header from "../components/Header";

const parseJwt = token => {
  console.log(token, typeof token);
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

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
      console.log(response);
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

  async function intervalFunction() {
    let date = new Date();
    if (date.getHours() === 8) {
      try {
        let response = await fetch("http://localhost:5000/dailyEverything", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    intervalFunction();
    let interval = setInterval(intervalFunction, 3600000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Header />

      <div className="homepage-container">
        <div className="homepage-btns">
          <button onClick={() => getAllQuestions()}>Everything</button>
          <button onClick={() => getBusinessQuestions()}>Business</button>
          <button onClick={() => getTechQuestions()}>Technology</button>
          <button onClick={() => getPoliticsQuestions()}>Politics</button>
          <button onClick={() => getWorldQuestions()}>World</button>
        </div>

        {questions.length ? (
          <QuizCards style={{ flex: 1, margin: 20 }} 
          user={parseJwt(localStorage.getItem("token")).username}
          allQuestions={questions} />
        ) : (
          <QuizCardsPlaceholder />
        )}

        <Stats
          style={{ flex: 1, marginRight: 20 }}
          user={parseJwt(localStorage.getItem("token")).username}
        />
      </div>
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
};
