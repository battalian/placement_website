var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var session = require('express-session');
var bunyan = require('bunyan');
var mongoose = require('mongoose');
var studentData = require('./student_models.js');
var companyData = require('./company_models.js');


/* GET users listing. */
/*Login for company*/
router.post('/', function(req, res) {
  var url = 'mongodb://localhost:27017/company';
  console.log('esgv');
  mongoose.connect(url);	
  console.log("connection established");
  
		companyData.findOne({ company: req.body.u }, function(err, result) {
				if(err)
				{
					
				}
				else if(!result)
				{
					console.log('this company not registered');
					req.flash('company', 'this company not registered');
					res.redirect('/company_login');
				}
				else
				{
					if (req.body.p === result.password) {
      					console.log(req.body.u + ' login succesful');
      					var log = bunyan.createLogger({
    					name: 'company:'+ req.body.u,
    					streams: [{
        					path: '/var/log/Placement_portal.log',
    							}]
						});
						log.info(req.body.u + ' was logged in');
      					req.session.company = result;
      					res.redirect('myaction/dashboard');
      					} 
      				else {
      					console.log(' password is wrong');
      					req.flash('password','password is wrong');
      					res.redirect('/company_login');
      					}
				}
					mongoose.connection.close();
				});

});

/* shows the student details registered for this company*/
router.get('/dashboard', function(req, res){
	console.log('i am dashboard');
	console.log(req.session.result);
	console.log(req.session.company.company);
	//res.send('hello googlr');
		if(req.session.company)
		{
			console.log("logged in");
  			var url = 'mongodb://localhost:27017/student_details';
  			console.log('esgv');
  			mongoose.connect(url);
				console.log("connection established");
				studentData.find({ registered: { "$in" : [req.session.company.company]} }, function(err, result){
				console.log(result);
				mongoose.connection.close();
				res.render('registered_students', {data: result});
			});
		}
		
		else
		{
			console.log("not logged in");	
		}				
});

module.exports = router;

