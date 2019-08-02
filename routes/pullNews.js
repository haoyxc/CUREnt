const axios = require("axios");
const newsType = ["politics", "science", "world", "business"];
const API_KEY = process.env.NYT_API;

const people = require("../constants/people");
const county_list = require("../constants/country_list");

async function getArticles(category) {
  try {
    let resp = await axios(
      `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${API_KEY}`
    );
    let articles = resp.data.results;
    articles = articles.slice(0, 20);

    let abstracts = articles.map(article => ({
      abstract: article.abstract,
      url: article.url
    }));
    console.log(abstracts);
  } catch (e) {
    console.log(e);
  }
}

function generateQuestion(singleAbstract) {
  let abstract = singleAbstract.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
//   let words = abstract.split(" ");
if (countries_list.some(substring=>abstract.includes(substring))){
    //the abstract has a country
}

  words.forEach(word => )
  console.log("lol");
}
getArticles(newsType[0]);
