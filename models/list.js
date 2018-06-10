//Require mongoose package
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define BucketlistSchema with title, description and category
const MovielistSchema = Schema({
    title: String,
    _year_data: String,
    year: Number,
    rated: String,
    //released: Date,
    runtime: String,
    genres: String,
    director: String,
    writer: String,
    actors: String,
    plot: String,
    languages: String,
    country: String,
    awards: String,
    poster: String,
    ratings:
    [ { Source: String, Value: String },
    { Source: String, Value: String },
    { Source: String, Value: String } ],
    metascore: String,
    rating: String,
    votes: String,
    imdbid: String,
    type: String,
    dvd: String,
    boxoffice: String,
    production: String,
    website: String,
    response: String,
    series: Boolean,
    imdburl: String 
});

const Movielist = module.exports = mongoose.model('Movielist', MovielistSchema );

//Movielist.find() returns all the lists
module.exports.getAllLists = (callback) => {
    Movielist.find(callback);
    //console.log(Movielist.find(callback))
}

//newList.save is used to insert the document into MongoDB
module.exports.addList = (newList, callback) => {
    newList.save(callback);
}

//Here we need to pass an id parameter to BUcketList.remove
module.exports.deleteListById = (id, callback) => {
    let query = {_id: id};
    Movielist.remove(query, callback);
}