const axios = require("axios");
const newsType = ["politics", "science", "world", "business"];
const API_KEY = process.env.NYT_API;

const people = require("../constants/people");

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
  console.log("lol");
}
getArticles(newsType[0]);
