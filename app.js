const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const addmovie = require('./controllers/addmovie');
const getmovieinfo = require('./controllers/getmovieinfo');
const weather = require('./controllers/weather');
const passportTwitter = require('./auth/twitter');

// Connect mongoose to our database
const config = require('./config/database');
mongoose.connect(config.database);


//Initialize our app variable
const app = express();

//Declaring Port
const port = 3000;

//Middleware for CORS
app.use(cors());

//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files
*/
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/getmovieinfo', getmovieinfo);
app.use('/addmovie', addmovie);
app.use('/weather', weather)

app.get('/auth/twitter', passportTwitter.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

app.get('/login', function(req, res, next) {
    res.send('Go back and register!');
  });

app.get('/', function(req, res, next) {
    res.render('index');
});
  
//Listen to port 3000
app.listen(process.env.PORT || port, () => {
    console.log(`Starting the server at port ${process.env.PORT|| port}`);
});