const axios = require("axios");
const newsType = ["politics", "science", "world", "business"];
// const baseUrl = "https://api.nytimes.com/svc/topstories/v2/science.json?api-key=";
const API_KEY = process.env.NYT_API;
const baseUrl = `https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${API_KEY}`;

async function getArticles(category) {
  try {
    let resp = await axios(
      `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${API_KEY}`
    );
    console.log(resp.data.results);
  } catch (e) {
    console.log(e);
  }
}
getArticles(newsType[0]);
