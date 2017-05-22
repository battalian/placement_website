var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var session = require('express-session');
var mongoose = require('mongoose');
var studentData = require('./student_models.js');
var companyData = require('./company_models.js');

/* check whether the session of user had expired and shows way to edit details form of student*/
router.get('/', function(req, res) {
	if(req.session.student){
	
	var MongoClient = mongodb.MongoClient;
  	var url = 'mongodb://localhost:27017/student_details';
    MongoClient.connect(url, function(err, db){
  	if(err)
	{
		console.log("cannot connect", err);	
	}
	else
	{
		console.log("connection established");
		var collection = db.collection("student");
		collection.findOne({ email: req.session.student.email }, function(err, result) {
		

			    if(err)
				{
					res.send(err);
				}
				else if(!result)
				{
					console.log('no email id registered');
				}
				else
				{
					console.log('email id already registered');
					res.render('edit_details', {"data": result});
				}
					db.close();
				});

	}
  }); 
  }
  else
  {
  	res.redirect('/');
  }
});

module.exports = router;