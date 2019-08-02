import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function QuizCards({ allQuestions }) {
    const [numRight, setNumRight] = 0;
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
		let found = false;
		for (let i = 0; i < allArray.length; i++) {
			if (allArray[i].question === ques && allArray[i].answered) {
				found = true;
			}
		}

		if (!found) {
			for (let i = 0; i < allQuestions.length; i++) {
				if (allQuestions[i].question === ques) {
                    allArray[i].answered = true;
					if (allQuestions[i].correctAnswer === ans) {
                        setNumRight(numRight + 1);
						event.target.classList.add('correct-answer');
					} else {
						event.target.classList.add('incorrect-answer');
					}
				}
            }
		}
	};

	return (
		<div>
			{allArray.map((item) => {
				return (
					<div className="card" style={{ width: 500 }}>
						<div className="card-body">
							<h5 className="card-title">{item.question}</h5>
							<form>
								{item.answerArray.map((ans) => {
									return (
										<input
											type="button"
											className="answerBtn"
											value={ans}
											onClick={(e) => clickHandler(e, ans, item.question)}
										/>
									);
								})}
							</form>
						</div>
					</div>
				);
            })}
            <button>Submit Quiz!</button>
		</div>
	);
}
