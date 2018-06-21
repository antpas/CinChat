let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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
