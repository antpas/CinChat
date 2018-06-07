//Require the express package and use express.Router()
const express = require('express');
const http = require('http');
const imdb = require('imdb-api');
const bodyParser = require('body-parser');
const router = express.Router();
//const MOVIE_API_KEY = process.env.MOVIE_API_KEY
const MOVIE_API_KEY = require('../apiKey');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/', (req,res) => {

    const movieInput = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.movie ? req.body.queryResult.parameters.movie : 'The Godfather';
    imdb.get(movieInput, {apiKey: MOVIE_API_KEY, timeout: 30000}).then(movie => {
        console.log(movie)

    });

});

router.post('/search', (req,res) => {
    
    const movieToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.movie ? req.body.queryResult.parameters.movie : 'The Godfather';
    imdb.search({
        title: movieToSearch
      }, {
        apiKey: MOVIE_API_KEY
      }).then(console.log).catch(console.log);

});


module.exports = router;