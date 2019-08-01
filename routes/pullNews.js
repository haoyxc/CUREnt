const axios = require('axios');
const NY_TIMES_API_KEY = 'L9wS3UQJeTPAD7ZUyum8BTR4RaKpGefV'
const newsType = ['politics', 'science', 'world', 'business'];


//Pull the stories from the specified categories
async function getNews() {
    try{
        let response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${newsType[0]}.json?api-key=${NY_TIMES_API_KEY}`);
        let articles = response.results
        console.log(articles);
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