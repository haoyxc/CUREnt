const axios = require("axios");
const newsType = ["politics", "science", "world", "business"];
const baseUrl = "https://api.nytimes.com/svc/topstories/v2/science.json?api-key=";
const API_KEY = process.env.NYT_API;
const baseUrl = `https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${API_KEY}`;

async function getArticles(category) {
  let resp = await axios(
    `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${API_KEY}`
  );
  console.log(resp);
}
getArticles(newsType[0]);
