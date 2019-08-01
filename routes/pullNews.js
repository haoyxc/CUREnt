const axios = require('axios');
const NY_TIMES_API_KEY = 'L9wS3UQJeTPAD7ZUyum8BTR4RaKpGefV'
const newsType = ['politics', 'science', 'world', 'business'];

axios.get(`https://api.nytimes.com/svc/topstories/v2/${newsType[0]}.json?api-key=${NY_TIMES_API_KEY}`)
    .then(function(response){
        console.log(response);
    })