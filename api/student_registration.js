var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var session = require('express-session');
var bunyan  = require('bunyan');
var mongoose = require('mongoose');



router.post('/', function(req, res) {
	console.log(req.body);

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
		
		collection.findOne({ email: req.body.email }, function(err, result) {
		//console.log(result.password + req.body.p);

			    if(err)
				{
				}
				else if(!result)
				{
					console.log('no email id registered');
					collection.insert([{"name":req.body.name, "email":req.body.email, "cgpa":req.body.cgpa, "stream":req.body.stream, "password":req.body.password, "registered":[], "color":{} }])
					var log = bunyan.createLogger({
    					name: 'student:'+ req.body.email,
    					streams: [{
        					path: '/var/log/Placement_portal.log',
    							}]
						});
					log.info(req.body.email + ' was registered');
					//req.flash('registration', 'registered succesfully');
					var response = "email registered succesfully";
					res.json(response);
					
				}
				else
				{
					console.log('email id already registered');
					var response = "email id already registered";
					res.json(response);
					//req.flash('email_registered', 'email id already registered');
				}
					//res.redirect('/student_register');
					db.close();
				});

	}
  });

	

});

module.exports = router;