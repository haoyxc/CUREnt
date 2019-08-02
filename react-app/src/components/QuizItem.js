import React from "react";

export default function QuizItem({ questionItem, index }) {
  const { question, correctAnswer, allAsnwers, sourceLink } = questionItem;
  return (
    <div className="flip-card">
      <div className="flip-card-inner" style={flipStyle}>
        <div className="flip-card-front">
          <h3 className="question-header">Question {index + 1}</h3>
          <hr />
          <h4 className="question-content">{question}</h4>
          <div className="answerBlock">
            {allAsnwers.map(answer => (
              <h5>
                <button className="emptyButton2" onClick={() => flipCard()}>
                  A) {answer}
                </button>
              </h5>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
