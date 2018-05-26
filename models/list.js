//Require mongoose package
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define BucketlistSchema with title, description and category
const MovielistSchema = Schema({
    title: String,
    description: String,
    category: String
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
    //console.log(newList.save(callback))
}

//Here we need to pass an id parameter to BUcketList.remove
module.exports.deleteListById = (id, callback) => {
    let query = {_id: id};
    Movielist.remove(query, callback);
}