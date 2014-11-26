// set up the express app
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// point the express app to the static files folder so it can set up a static file server
app.use(express.static(path.join(__dirname, 'client')));


// SET UP THE DATABASE STUFF
// now we need to add in mongoose to be able to connect to the DB
var mongoose = require('mongoose');
// connect to the db
mongoose.connect('mongodb://localhost/angularexpresstest');
// create the friend schema
var FriendSchema = new mongoose.Schema({
	name: String
})
// create the model using the schema and store it to Friend so that we can use it to run mongodb commands
mongoose.model('Friend', FriendSchema)
var Friend = mongoose.model('Friend')

// SET UP OUR ROUTES
// first route to get the list of friends from the server
app.get('/friends', function(req, res) {
	//console.log("from the server", friends)
	Friend.find({}, function(err, results) {
		res.json(results);
	})
})

// we want to be able to add a friend
app.post('/friends/create', function(req, res) {
	console.log(req.body);
	var new_friend = new Friend({name: req.body.new_friend})
	new_friend.save(function(err, results){
		res.end();
	});
})

// TELL THE SERVER TO LISTEN
app.listen(3000, function() {
	console.log("port 3000 is open for business")
})