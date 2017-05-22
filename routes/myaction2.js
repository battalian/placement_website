var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var session = require('express-session');
var bunyan  = require('bunyan');
var mongoose = require('mongoose');
var studentData = require('./student_models.js');
var companyData = require('./company_models.js');


/* GET users listing. */
/*Registering students and inserting in the database*/
router.post('/', function(req, res) {
  req.check('e', 'invalid email').isEmail();
  req.check('c', 'invalid cgpa').isFloat({ max: 10.0 });
  if(req.validationErrors())
  	{
  		req.flash('email', 'invalid email or invalid cgpa');
  	}

  console.log('done yet');
  var errors = req.validationErrors();
  console.log('errors are: ');
  console.log(errors);
  if(errors)
  {
  	
  	console.log(errors);
  	res.redirect('/student_register');
  }
  else{
 
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
		
		collection.findOne({ email: req.body.e }, function(err, result) {
		//console.log(result.password + req.body.p);

			    if(err)
				{
				}
				else if(!result)
				{
					console.log('no email id registered');
					collection.insert([{"name":req.body.n, "email":req.body.e, "cgpa":req.body.c, "stream":req.body.s, "password":req.body.p, "registered":[], "color":{} }])
					var log = bunyan.createLogger({
    					name: 'student:'+ req.body.e,
    					streams: [{
        					path: '/var/log/Placement_portal.log',
    							}]
						});
					log.info(req.body.e + ' was registered');
					req.flash('registration', 'registered succesfully');
					
				}
				else
				{
					console.log('email id already registered');
					req.flash('email_registered', 'email id already registered');
				}
					res.redirect('/student_register');
					db.close();
				});

	}
  });
}
});



module.exports = router;