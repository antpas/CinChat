const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const addmovie = require('./controllers/addmovie');
const getmovieinfo = require('./controllers/getmovieinfo');


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

app.use('/getmovieinfo', getmovieinfo);
app.use('/addmovie', addmovie);

app.get('/', (req,res) => {
    res.send("Hello");
});

//Listen to port 3000
app.listen(process.env.PORT || port, () => {
    console.log(`Starting the server at port ${port}`);
});