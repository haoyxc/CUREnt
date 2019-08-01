const axios = require("axios");
const newsType = ["politics", "science", "world", "business"];
const API_KEY = process.env.NYT_API;


//Pull the stories from the specified categories
async function getNews() {
    try{
        let response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${newsType[0]}.json?api-key=${NY_TIMES_API_KEY}`);
        let articles = response.results
        console.log(response);
        // let abstractAndUrl = [];
        // articles.forEach(article => {
        //     abstractAndUrl.push({
        //         abstract: article.abstract,
        //         url: article.url
        //     })
        // })
        // console.log(abstractAndUrl);
    }
    catch (err){
        console.log(err);
    }
}

getNews();
