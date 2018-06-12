//Require the express package and use express.Router()
const express = require('express');
const http = require('http');
const imdb = require('imdb-api');
let moviedbKey = process.env.MOVIE_DB_KEY
const MovieDB = require('moviedb')(moviedbKey);
const bodyParser = require('body-parser');
const router = express.Router();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/', (req,res) => {

    const movieInput = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.movie ? req.body.queryResult.parameters.movie : 'The Godfather';
    imdb.get(movieInput, {apiKey: MOVIE_API_KEY, timeout: 30000}).then(movie => {
        console.log(movie.title)
        let outText = movie.title + " was released in " + movie.year + " and directed by " + movie.director + ". " +
        movie.title + " was " + movie.awards  + "The synopsis is: " + movie.plot;
        let output = 
        {
            "fulfillmentText": outText,
            "fulfillmentMessages": [
                {
                "card": {
                    "title": movie.title,
                    "subtitle": "Metascore: " + movie.metascore + "%",
                    "imageUri": movie.poster,
                }
                }
            ]
        }
        res.json(output)
    });

});

router.post('/search', (req,res) => {
    
    const movieToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.movie ? req.body.queryResult.parameters.movie : 'The Godfather';
    imdb.search({
        title: movieToSearch
      }, {
        apiKey: MOVIE_API_KEY
      }).then(movie => {
        console.log(movie.title)
        res.json(movie)
      });

});

router.post('/popular', (req,res) => {


});


module.exports = router;