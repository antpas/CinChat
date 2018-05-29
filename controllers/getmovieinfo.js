//Require the express package and use express.Router()
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const router = express.Router();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY
//const MOVIE_API_KEY = require('../apiKey');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/', (req,res) => {

    const movieToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.movie ? req.body.queryResult.parameters.movie : 'The Godfather';
    const reqUrl = encodeURI(`http://www.omdbapi.com/?t=${movieToSearch}&apikey=${MOVIE_API_KEY}`);
    http.get(reqUrl, (responseFromAPI) => {
        let completeResponse = '';
        responseFromAPI.on('data', (chunk) => {
            completeResponse += chunk;
        });
        responseFromAPI.on('end', () => {
            const movie = JSON.parse(completeResponse);
            let dataToSend = movieToSearch === 'The Godfather' ? `I don't have the required info on that. Here's some info on 'The Godfather' instead.\n` : '';
            dataToSend += `${movie.Title} is a ${movie.Actors} starer ${movie.Genre} movie, released in ${movie.Year}. It was directed by ${movie.Director}`;

            return res.json({
                fulfillmentText: dataToSend,
                speech: dataToSend,
                displayText: dataToSend,
                source: 'getmovieinfo'
            });
        });
    }, (error) => {
        return res.json({
            source: 'getmovieinfo',
            speech: 'Something went wrong!',
            displayText: 'Something went wrong!'
        });
    });
});


module.exports = router;