const axios = require("axios");
const newsCategories = ["politics", "technology", "world", "business"];
const API_KEY = process.env.NYT_API;
const _ = require("underscore");

const Quiz = require("../models/Quiz");

const express = require("express");
const router = express.Router();

const country_list = require("../constants/country_list");
const us_states_list = require("../constants/us_states_list");
const company_list = require("../constants/company_list");
const people = require("../constants/people");

let allLists = [people, us_states_list, country_list, company_list];

//get all articles
async function getArticles(category) {
  try {
    let resp = await axios(
      `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${API_KEY}`
    );
    let articles = resp.data.results;
    let abstracts = articles.map(article => ({
      abstract: article.abstract,
      url: article.url
    }));
    return abstracts;
  } catch (e) {
    console.log(e);
  }
}

//To generate a question's choices based on an abstract (String) and a list of lists
function generateChoices(singleAbstract, allLists) {
  let abstract = singleAbstract.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

  let match = null;
  let matchList = null;
  let index = 0;
  while (!match && index < allLists.length) {
    match = checker(abstract, allLists[index]);
    matchList = allLists[index];
    index++;
  }
  if (match && matchList) {
    let { matchWord, choices } = checker(abstract, matchList);
    return { matchWord, choices };
  } else {
    //returns falsey value if there is no match
    return null;
  }
}
//helper function: checks if any item of an array is contained in a sentence
function checker(sentence, arr) {
  let matchWord = null;
  let choices = null;
  for (var i = 0; i < arr.length; i++) {
    if (sentence.indexOf(arr[i]) > -1) {
      matchWord = arr[i];
    }
  }

  if (matchWord) {
    choices = _.shuffle(arr.filter(word => word !== matchWord)).slice(0, 3);
    return {
      matchWord,
      choices
    };
  }
  //falsey if none
  return matchWord;
}

async function getQuestionsByCategory(category) {
  let questions = [];

  let abstracts = await getArticles(category);
  abstracts.forEach(item => {
    let generatedChoices = generateChoices(item.abstract, allLists);
    if (generatedChoices) {
      let { matchWord, choices } = generatedChoices;
      let questionWithoutAnswer = item.abstract.replace(matchWord, "__________");
      let questionObj = {
        question: questionWithoutAnswer,
        correctAnswer: matchWord,
        wrongAnswers: choices,
        sourceLink: item.url
      };
      questions.push(questionObj);
    }
  });
  return questions;
  //   console.log(questions);
  //   console.log(questions.length);
}
//get all questions - duplicates are ignored
async function getAllQuestions() {
  let questions = await Promise.all(
    newsCategories.map(category => getQuestionsByCategory(category))
  );
  questions = questions.flat();

  //   console.log(questions.length);
  let uniqueQuestions = _.uniq(questions, "question");

  return uniqueQuestions;
}

router.get("/dailyEverything", async (req, res) => {
  console.log("daily everything");
  let allQ = await getAllQuestions();

  //   console.log(getAllQuestions());
  let allQuestions = _.shuffle(allQ);
  //   console.log(allQuestions);
  console.log("SLICE", allQuestions.slice(0, 10));
  let allQuiz1 = new Quiz({
    questions: JSON.stringify(allQuestions.slice(0, 10)),
    date: new Date()
  });
  let allQuiz2 = new Quiz({
    questions: JSON.stringify(allQuestions.slice(10, 20)),
    date: new Date()
  });
  let allQuiz3 = new Quiz({
    questions: JSON.stringify(allQuestions.slice(20, 30)),
    date: new Date()
  });

  allQuiz1
    .save()
    .then(response => {
      //   console.log("QUIZ!", response);
      res.send(response);
      console.log("saved allQuiz1");
    })
    .catch(e => {
      console.log(e);
    });

  allQuiz2
    .save()
    .then(response => {
      // console.log("QUIZ2", response);
      console.log("saved allQuiz2");
    })
    .catch(e => {
      console.log(e);
    });
  allQuiz3
    .save()
    .then(response => {
      //   console.log("QUIZ3", response);
      console.log("saved allQuiz3");
    })
    .catch(e => {
      console.log(e);
    });

  for (let i = 0; i < newsCategories.length; i++) {
    let category = newsCategories[i];
    let qs = await getQuestionsByCategory(category);
    let categoryQuiz = new Quiz({
      questions: JSON.stringify(qs),
      date: new Date(),
      category: category
    });
    categoryQuiz
      .save()
      .then(response => {
        // console.log(response);
        // console.log("saved category quiz");
      })
      .catch(e => {
        console.log(e);
      });
  }
});

router.get("/quiz", (req, res) => {
  Quiz.find({ category: "all" })
    .sort({ date: -1 })
    .limit(3)
    .exec()
    .then(response => {
      // console.log(response);
      // console.log("getting all quizzes");

      let responseParsed = response.map(quizItem => JSON.parse(quizItem.questions));
      //sends 3 quizzes!!
      res.send(responseParsed);
    })
    .catch(e => {
      console.log(e);
      res.send(e);
    });
});

router.get("/quiz/:category", (req, res) => {
  let category = req.params.category;
  Quiz.find({ category: category })
    .sort({ date: -1 })
    .exec()
    .then(response => {
      // console.log(response, category);
      //sends ONE quiz
      res.send(JSON.parse(response[0].questions));
    })
    .catch(e => {
      console.log(e);
      res.send(e);
    });
});

module.exports = router;
