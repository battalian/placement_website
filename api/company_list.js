var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var session = require('express-session');
var bunyan  = require('bunyan');
var mongoose = require('mongoose');


/* GET home page. Route to get the home company login form along with some error handling messages*/
router.get('/', function(req, res) {
  //res.render('company_login', {"company":req.flash('company'), "password":req.flash('password')});
  //res.end('Hi folks');

  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/company';
  MongoClient.connect(url, function(err, db){
  	if(err)
	{
		console.log("cannot connect", err);	
	}
	else
	{
		console.log("connection established");
		var collection = db.collection("student");
		collection.find({}).toArray(function(err, result) {
			//console.log( result );
			res.json(result);
		});
		
	}
  });
});

module.exports = router;