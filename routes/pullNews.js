const axios = require("axios");
const newsType = ["politics", "technology", "world", "business"];
const API_KEY = process.env.NYT_API;
const _ = require("underscore");

// const people = require("../constants/people");
const country_list = require("../constants/country_list");
const us_states_list = require("../constants/us_states_list");
const company_list = require("../constants/company_list");
const people = require("../constants/people");

let allLists = [company_list, us_states_list, country_list];

//get all articles
async function getArticles(category) {
  try {
    let resp = await axios(
      `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${API_KEY}`
    );
    let articles = resp.data.results;
    // articles = articles.slice(0, 20);

    let abstracts = articles.map(article => ({
      abstract: article.abstract,
      url: article.url
    }));
    console.log(abstracts);
  } catch (e) {
    console.log(e);
  }
}

//To generate a question
function generateChoices(singleAbstract) {
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
    console.log(matchWord, choices);
    return { matchWord, choices };
  } else {
    //returns falsey value if there is no match
    console.log("no match");
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
    choices = _.shuffle(arr).slice(0, 3);
    return {
      matchWord,
      choices
    };
  }
  //falsey if none
  return matchWord;
}

// getArticles(newsType[3]);
generateChoices("New Hampshire is cool");
