//Require the express package and use express.Router()
const express = require('express');
const http = require('http');
const imdb = require('imdb-api');
const movielist = require('../models/movie');
const moviedbKey = process.env.MOVIE_DB_KEY
const MovieDB = require('moviedb')(moviedbKey);
const bodyParser = require('body-parser');
const router = express.Router();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY
const os = require('os');
const  request = require('request');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

function returnMultMovies(movies) {
    let listMovies = ""
    for(let i=0; i < movies.results.length; i++){
        if(!movies.results[i].hasOwnProperty('year'))
            listMovies = listMovies + " " + movies.results[i].title + ", "
        else
            listMovies = listMovies + " " + movies.results[i].title + " " + "(" + movies.results[i].year + "), " 

    }
    outText = "How about these?" + listMovies
    output = 
    {
        "fulfillmentText": outText,
    }
    return output
} 

function addToDB(movie){
    let newList = new movielist
    //movie.userID = user.id
    movielist.findOneAndUpdate({title: movie.title}, movie, {upsert: true}, function (err2, doc) {
        if (err2) 
        {
            console.log(err2)
            res.json("Error")
        } 
        else 
        {
            console.log("Added to DB!")
        }
    });
}

router.post('/', (req,res) => {
    
    let action = req.body.queryResult.action;
    let parameter = req.body.queryResult.parameters
    let outText;
    let output;
    let movieInput;
    let movieToSearch;

    if(action == "getmovieinfo"){
        movieInput = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.movie ? req.body.queryResult.parameters.movie : 'The Godfather';
        imdb.get(movieInput, {apiKey: MOVIE_API_KEY, timeout: 30000}).then(movie => {
            outText = movie.title + " was released in " + movie.year + " and directed by " + movie.director + 
            ". The metascore is: " + movie.metascore + "%";
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
            addToDB(movie)
            res.json(output)
        });
    }
    else if(action == "popular"){

        MovieDB.miscPopularMovies((err, moviedbResp) => {
            let output = returnMultMovies(moviedbResp)
            res.json(output)
        });
    }
    else if(action == "genre"){
        let apiURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + moviedbKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres="
        if(parameter.romance.replace(/ /g,'') == "romance"){
            apiURL = apiURL + '10749' //romance id
            request(apiURL, function (error, response, movie) {
                output = returnMultMovies(JSON.parse(movie))                
                res.json(output)
            });
        }
        else if(parameter.drama.replace(/ /g,'') == "drama"){
            apiURL = apiURL + '18'
            request(apiURL, function (error, response, movie) {
                output = returnMultMovies(JSON.parse(movie))                
                res.json(output)
            });
        }
        else if(parameter.action.replace(/ /g,'') == "action"){
            apiURL = apiURL + '28'
            request(apiURL, function (error, response, movie) {
                output = returnMultMovies(JSON.parse(movie))                
                res.json(output)
            });
        }
        else if(parameter.comedy.replace(/ /g,'') == "comedy"){
            apiURL = apiURL + '35'
            request(apiURL, function (error, response, movie) {
                output = returnMultMovies(JSON.parse(movie))                
                res.json(output)
            });
        }
        else if(parameter.documentary.replace(/ /g,'') == "documentary"){
            apiURL = apiURL + '99'
            request(apiURL, function (error, response, movie) {
                output = returnMultMovies(JSON.parse(movie))                
                res.json(output)
            });
        }
        else if(parameter.scifi.replace(/ /g,'') == "scifi"){
            apiURL = apiURL + '878'
            request(apiURL, function (error, response, movie) {
                output = returnMultMovies(JSON.parse(movie))                
                res.json(output)
            });
        }
        else{
            apiURL = apiURL + '12'
            request(apiURL, function (error, response, movie) {
                output = returnMultMovies(JSON.parse(movie))                
                res.json(output)
            });

        }
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
                let output = returnMultMovies(movie)
                res.json(output)
        });
    }
    else{
        output = "test"
        res.json(output)
    }
});


module.exports = router;