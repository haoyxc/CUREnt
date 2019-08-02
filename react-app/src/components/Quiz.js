import React, { useEffect, useState } from "react";
import QuizItem from "./QuizItem";
const axios = require("axios");
const _ = require("underscore");

export default function Quiz({ questions }) {
  const [questionsObj, setQuestionsObj] = useState(null);

  useEffect(() => {
    console.log(questions);
    let newQuestionArr = questions.map(q => {
      let allAnswers = [...q.wrongAnswers, ...q.correctAnswer];

      return {
        question: q.question,
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
