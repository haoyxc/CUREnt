import React, { useEffect, useState } from "react";
const axios = require("axios");
const _ = require("underscore");
const QuizItem = require("./QuizItem");

export default function Quiz({ questions }) {
  const [questionsObj, setQuestionsObj] = useState(null);

  useEffect(() => {
    let newQuestionArr = questions.map(q => {
      let allAnswers = [...q.wrongAnswers, ...q.correctAnswer];

      return {
        question: q.correctAnswer,
        allAnswers: _.shuffle(allAnswers),
        correctAnswer: q.correctAnswer,
        sourceLink: q.sourceLink
      };
    });
    setQuestionsObj(newQuestionArr);
  }, []);
  return (
    <div>
      {questionsObj.map((qObj, index) => (
        <QuizItem questionItem={qObj} index={index} />
      ))}
    </div>
  );
}
