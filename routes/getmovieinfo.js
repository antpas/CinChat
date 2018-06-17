//Require the express package and use express.Router()
const express = require('express');
const http = require('http');
const imdb = require('imdb-api');
let moviedbKey = process.env.MOVIE_DB_KEY
const MovieDB = require('moviedb')(moviedbKey);
const bodyParser = require('body-parser');
const router = express.Router();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY
const os = require('os');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/', (req,res) => {
    
    let action = req.body.queryResult.action;
    let outText;
    let output;
    let movieInput;
    let movieToSearch;

    if(action == "getmovieinfo"){
        movieInput = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.movie ? req.body.queryResult.parameters.movie : 'The Godfather';
        imdb.get(movieInput, {apiKey: MOVIE_API_KEY, timeout: 30000}).then(movie => {
            outText = movie.title + " was released in " + movie.year + " and directed by " + movie.director + ". " +
            movie.title + " was " + movie.awards;
            output = 
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
    }
    else if(action == "popular"){
        output = "popular"
        res.json(output)
    }
    else if(action == "search"){
        output = "search"
        res.json(output)
    }
    else if(action == "movie-intent.movie-intent-more"){
        movieToSearch = req.body.queryResult.outputContexts[0].parameters.movie
        imdb.search({
            title: movieToSearch
          }, {
            apiKey: MOVIE_API_KEY
          }).then(movie => {
                let listMovies = ""
                for(let i=0; i< movie.results.length; i++){
                    listMovies = listMovies + " " + movie.results[i].title + " " + "(" + movie.results[i].year + "), " 
                }
                outText = "Which one of these?" + listMovies
                output = 
                {
                    "fulfillmentText": outText,
                }
                res.json(output)
        });
    }
    else{
        output = "test"
        res.json(output)
    }
});


module.exports = router;