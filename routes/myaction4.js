var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var session = require('express-session');
var bunyan = require('bunyan');

/* GET users listing. */
/*Company registration for placement event along with some error messages and inserts company info in database*/
router.post('/', function(req, res) {
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
		
		collection.findOne({ company: req.body.c }, function(err, result) {

			    if(err)
				{
					res.send(err);
				}
				else if(!result)
				{
					//res.render('studentslist',{"studentlist":result});
					console.log('no company registered');
					collection.insert([{"company":req.body.c, "designation":req.body.d, "package":req.body.pa, "location":req.body.l, "password":req.body.p }])
					
					var log = bunyan.createLogger({
    					name: 'company:'+ req.body.c,
    					streams: [{
        					path: '/var/log/Placement_portal.log',
    							}]
						});
					log.info(req.body.c + ' was registered');
					req.flash('registration', 'registration succesful');
					res.redirect('/company_register');
					
				}
				else
				{
					console.log('company already registered');
					req.flash('company','company already registered');
					res.redirect('/company_register');
				}
					db.close();
				});

	}
  });

});



module.exports = router;