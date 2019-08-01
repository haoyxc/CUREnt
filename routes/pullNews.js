const axios = require("axios");
const NY_TIMES_API_KEY = "L9wS3UQJeTPAD7ZUyum8BTR4RaKpGefV";
const newsType = ["politics", "science", "world", "business"];

axios
  .get(
    `https://api.nytimes.com/svc/topstories/v2/${
      newsType[0]
    }.json?api-key=${NY_TIMES_API_KEY}`
  )
  .then(function(response) {
    console.log(response);
  });

const axios = require("axios");
const newsType = ["politics", "science", "world", "business"];
// const baseUrl = "https://api.nytimes.com/svc/topstories/v2/science.json?api-key=";
const API_KEY = process.env.NYT_API;
// const baseUrl = `https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${API_KEY}`;

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
