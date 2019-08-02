import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function QuizCards({ allQuestions, user }) {
	// let [numRight, setNumRight] = useState(0)
	let numRight = 0;
	let [finished, setFinished] = useState(false);
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

						postGuess("true", "business").catch(e => {console.log(e)})
						console.log("h");
                        numRight++;
						event.target.classList.add('correct-answer');	
					} else {
						postGuess("false", "business").catch(e => {console.log(e)})
						console.log('hf')
						event.target.classList.add('incorrect-answer');	
					}
				}	
            }	
		}	
	};

	const postGuess = async (guess, type) => {
		const response = await fetch("http://localhost:5000/stats/new/" + user + "/" + guess + "/" + type, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json"
		  },
		  body: JSON.stringify({
			correct: guess,
			category: type,
		  })
		});
		const content = await response.json();
		console.log(content);
	  };

	const submitQuiz = () => {
		setFinished(true);
	}

	const tryAgain = () => {
		setFinished(false);
	}

	return (
		<div className="question-card-container">
			{finished ? <div><h2>Nice run! Click below to try again.</h2>
			<button onClick={() => tryAgain()}>Try again?</button>
			</div>: <div>{allArray.map((item) => {
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
			</div>}
			
			
		</div>
	);
}
