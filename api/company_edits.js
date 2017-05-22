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
  var url = 'mongodb://localhost:27017/company';
  
  MongoClient.connect(url, function(err, db){
  	if(err)
	{
		console.log("cannot connect", err);	
	}
	else
	{
		//console.log(req.session.student);
		//console.log(req.body.company_name);
		company_name = req.body.company;
		console.log("connection established to update");
		var collection = db.collection("student");
		collection.findOne({ company: company_name }, function(err, result) {

			    if(err)
				{
					//res.send(err);
				}
				else if(!result)
				{
					console.log('no company registered');
				}
				else
				{
					collection.update( {'company' : company_name }, { "$set" : { "designation" : req.body.Designation, "package": req.body.Package, "location":req.body.Location, "password":req.body.Password } } );
					//req.session.student = result;
					collection.findOne({ company: company_name }, function(err, result) {
						console.log('updated results ');
						console.log(result);
					});

					var log = bunyan.createLogger({
    				name: 'company:'+ company_name,
    				streams: [{
        				path: '/var/log/Placement_portal.log',
    						}]
						});
					log.info(company_name + ' edited their details ');
					//res.redirect('myaction3/dashboard');
				}
					db.close();
				});
			

	}
  });

});



module.exports = router;