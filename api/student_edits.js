var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var session = require('express-session');
var bunyan = require('bunyan');
var mongoose = require('mongoose');



/* GET users listing. */
/*student updates their details and stores in database*/
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
		//console.log(req.session.student);
		//console.log(req.body.company_name);
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
					collection.update( {'email' : student_email }, { "$set" : { "name" : req.body.Name, "cgpa": req.body.CGPA, "stream":req.body.Stream, "password":req.body.Password } } );
					//req.session.student = result;
					collection.findOne({ email: student_email }, function(err, result) {
						console.log('updated results ');
						console.log(result);
					});

					var log = bunyan.createLogger({
    				name: 'student:'+ student_email,
    				streams: [{
        				path: '/var/log/Placement_portal.log',
    						}]
						});
					log.info(student_email + ' edited his/her details ');
					//res.redirect('myaction3/dashboard');
					//res.json('Hi folks');
				}
					db.close();
				});
			

	}
  });

});



module.exports = router;