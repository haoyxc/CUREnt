import React from "react";

export default function QuizCards({allQuestions}) {
    let questionArray = [];
    for (let i = 0; i < allQuestions.length; i++) {
        questionArray.push(allQuestions[i].question)
    }
    console.log(questionArray);
    return (<div>
        <ul>
            {allQuestions.map(item => {
             return <li>{item.question}</li>   
            })}
        </ul>
    </div>)
}