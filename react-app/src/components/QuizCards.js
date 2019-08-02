import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function QuizCards({ allQuestions }) {
	let [numRight, setNumRight] = useState(0)
	let [started, setStarted] = useState(false);
	let allArray = [];
	for (let i = 0; i < 10; i++) {
		let ansArray = [ allQuestions[i].correctAnswer ];
		for (let j = 0; j < allQuestions[i].wrongAnswers.length; j++) {
			ansArray.push(allQuestions[i].wrongAnswers[j]);
		}
		ansArray.sort(() => Math.random() - 0.5);
		allArray.push({ question: allQuestions[i].question, answerArray: ansArray, answered: false });
	}

	const clickHandler = (event, ans, ques) => {
		console.log("what");
		let found = false;	
		for (let i = 0; i < allArray.length; i++) {	
			if (allArray[i].question === ques && allArray[i].answered) {	
				found = true;	
			}	
		}
		console.log(event.classList);
 		if (!found) {	
			for (let i = 0; i < allQuestions.length; i++) {	
				if (allQuestions[i].question === ques) {	
                    allArray[i].answered = true;	
					if (allQuestions[i].correctAnswer === ans) {
						console.log("h");
                        
						event.target.classList.add('correct-answer');	
					} else {
						console.log('hf')
						event.target.classList.add('incorrect-answer');	
					}
				}	
            }	
		}	
	};

	const submitQuiz = () => {

	}

	return (
		<div className="question-card-container">
			{allArray.map((item) => {
				return (
					<div className="card question-card" style={{ width: 500 }}>
						<div className="card-body">
							<h5 className="card-title">{item.question}</h5>
							<form className="answerBlock">
								{item.answerArray.map((ans) => {
									return (
										<input
											type="button"
											className="answerBtn"
											onClick={(e) => clickHandler(e, ans, item.question)}
											value={ans}
										/>
									);
								})}
							</form>
						</div>
					</div>
				);
			})}
			<button onClick={()=> submitQuiz()}>Submit Quiz!</button>
		</div>
	);
}
