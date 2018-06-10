//Require the express package and use express.Router()
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
weather = require('openweathermap-node')
const OpenWeatherMapHelper = require("openweathermap-node");
const synonyms = require("synonyms");
var randomItem = require('random-item');
const imdb = require('imdb-api');
var async = require("async");
const WEATHER_KEY = process.env.WEATHER_KEY
const MOVIE_API_KEY = process.env.MOVIE_API_KEY

const helper = new OpenWeatherMapHelper(
    {
        APPID: WEATHER_KEY,
        units: "imperial"
    }
);

router.post('/', (req,res) => {

    //Asyncronous Call -> Get Weather to Search Movie
    async.waterfall([
        function(callback) {
            townName = req.body.townName
            let weatherType
            let synArray = []
            helper.getCurrentWeatherByCityName(townName, (err, currentWeather) => {
                if(err){
                    console.log(err);
                    res.json(err)   
                }
                else{
    
                    weatherID = currentWeather.weather[0].id
                    if(weatherID <= 300 || (weatherID < 600 && weatherID >= 500) ){
                        weatherType = "Rain"
                    }
                    else if((weatherID < 700 && weatherID >= 600)){
                        weatherType = "Snow"
                    }
                    else if((weatherID < 800 && weatherID >= 700)){
                        weatherType = "Bad"
                    }
                    else if((weatherID < 900 && weatherID > 800)){
                        weatherType = "Cloud"
                    }
                    else if(weatherID == 800){
                        weatherType = "Good"
                    }   
                    let array1 = synonyms(weatherType, "n")
                    let array2 = synonyms(weatherType, "s")
                    let array3 = synonyms(weatherType, "v")
                    if(typeof array1 == 'undefined' && !array1 ){
                        array1 = weatherType
                    }
                    if(typeof array2 == 'undefined' && !array2 ){
                        array2 = weatherType
                    }
                    if(typeof array3 == 'undefined' && !array3 ){
                        array3 = weatherType
                    }
                    let temp1 = array1.concat(array2)
                    synArray = temp1.concat(array3)
                    let synWord = randomItem(synArray)
                    callback(null, synWord)   
                }
            });
        }
      ],
      function(err, result) {
        const movieInput = result;
        imdb.get(movieInput, {apiKey: MOVIE_API_KEY, timeout: 30000}).then(movie => {
            console.log(movie)
            res.json(movie)
        });
    });
});

module.exports = router;