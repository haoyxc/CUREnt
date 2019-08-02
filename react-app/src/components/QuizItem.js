import React from "react";

export default function QuizItem({ questionItem, index }) {
  const { question, correctAnswer, allAnswers, sourceLink } = questionItem;
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h3 className="question-header">Question {index + 1}</h3>
          <hr />
          <h4 className="question-content">{question}</h4>
          <div className="answerBlock">
            {allAnswers.map(answer => (
              <h5>
                <button className="emptyButton2">A) {answer}</button>
              </h5>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
