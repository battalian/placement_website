var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var session = require('express-session');
var bunyan = require('bunyan');
var mongoose = require('mongoose');

var studentData = require('../routes/student_models.js');
var companyData = require('../routes/company_models.js');

router.post('/', function(req, res){
		
		console.log(req.body);
		if(req.body.company)
		{
			console.log("logged in");
  			var url = 'mongodb://localhost:27017/student_details';
  			//console.log('esgv');
  			mongoose.connect(url);
				console.log("connection established");
				studentData.find({ registered: { "$in" : [req.body.company]} }, function(err, result){
				console.log(result);
				mongoose.connection.close();
				//res.render('registered_students', {data: result});
				res.json(result);
			});
		}
		
		else
		{
			console.log("not logged in");	
		}				
});

module.exports = router;
