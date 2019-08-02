import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function QuizCards({ allQuestions }) {
  let allArray = [];
  for (let i = 0; i < allQuestions.length; i++) {
    let ansArray = [allQuestions[i].correctAnswer];
    for (let j = 0; j < allQuestions[i].wrongAnswers.length; j++) {
      ansArray.push(allQuestions[i].wrongAnswers[j]);
    }
    ansArray.sort(() => Math.random() - 0.5);
    allArray.push({ question: allQuestions[i].question, answerArray: ansArray });
  }

  return (
    <div class="question-card-container">
      {allArray.map(item => {
        return (
          <div className="card question-card" style={{ width: 500 }}>
            <div className="card-body">
              <h5 className="card-title">{item.question}</h5>
              <form className="answerBlock">
                {item.answerArray.map(ans => {
                  return <input type="button" className="answerBtn" value={ans} />;
                })}
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}
