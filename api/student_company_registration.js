var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var session = require('express-session');
var bunyan = require('bunyan');
var mongoose = require('mongoose');

var studentData = require('../routes/student_models.js');
var companyData = require('../routes/company_models.js');

router.post('/', function(req, res) {
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/student_details';
  
  MongoClient.connect(url, function(err, db){
  	if(err)
	{
		console.log("cannot connect", err);	
	}
	else
	{
		//console.log(req.session.student);
		console.log(req.body.company);
		student_email = req.body.email;
		console.log("connection established to update");
		var collection = db.collection("student");
		collection.findOne({ email: student_email }, function(err, result) {

			    if(err)
				{
					//res.send(err);
				}
				else if(!result)
				{
					console.log('no email id registered');
				}
				else
				{
					var found = 0;
					var registered_companies =[];
					var color= result.color;
					registered_companies = result.registered;
					console.log(result.registered);
					console.log('hi these are registered companies '  + registered_companies); 
					console.log(req.body.company);
					for(var i=0; i<registered_companies.length; i++)
					{
						if(registered_companies[i] == req.body.company)
						{
							//registered_companies.splice(i, 1);
							found = 1;
							//color[req.body.company_name] = 2;
							console.log('already registered');
							break;
						}
					}
					if(found == 0)
					{
						registered_companies.push(req.body.company);
						color[req.body.company] = 1;

						var log = bunyan.createLogger({
    					name: 'student:'+ student_email,
    					streams: [{
        				path: '/var/log/Placement_portal.log',
    							}]
						});
						log.info(student_email + ' was registered for ' +  req.body.company);
					}
					collection.update( {'email' : student_email }, { "$set" : { "registered" : registered_companies, "color": color } } );
					//req.session.student = result;
					collection.findOne({ email: student_email }, function(err, result) {
						console.log('updated results ');
						console.log(result);
					});
					
					//res.redirect('myaction3/dashboard');
				}
					db.close();
				});
			

	}
  });

});


module.exports = router;