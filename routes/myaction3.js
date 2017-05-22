var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var session = require('express-session');
var bunyan = require('bunyan');
var mongoose = require('mongoose');
var studentData = require('./student_models.js');
var companyData = require('./company_models.js');





/* GET users listing. */
/*student login verification */
router.post('/', function(req, res) {
  req.check('e', 'invalid email').isEmail();
  var errors = req.validationErrors();
  if(errors)
  {
  	console.log(errors);
  	req.flash('errors', 'invalid email');
  	res.redirect('/student_login');
  }
  else{
  	
  
  console.log('esgv');
  var url = 'mongodb://localhost:27017/student_details';
  mongoose.connect(url);

  

  studentData.findOne( { email: req.body.e } ,function(err, result) {
			    if(err)
				{
					//res.send(err);
				}
				else if(!result)
				{
					
					req.flash('noEmail', 'This email id not registered');
					console.log('no email id registered');
					res.redirect('/student_login');
					
				}
				else
				{
					if (req.body.p === result.password) {
        				//res.redirect('/dashboard');
      					console.log(req.body.e + ' login succesful');

      					req.session.student = result;
      					var log = bunyan.createLogger({
    					name: 'student:'+ req.body.e,
    					streams: [{
        					path: '/var/log/Placement_portal.log',
    							}]
						});
						log.info(req.body.e + ' was logged in');
      					res.redirect('myaction3/dashboard');
      					//req.session.result = result;
      					//console.log( req.session );

      					} 
      				else {
        				//res.render('login.jade', { error: 'Invalid email or password.' });
      					console.log(' password is wrong');
      					req.flash('incorrectPassword','password is not correct');
      					res.redirect('/student_login');
      					}
				}  		
  	});
  	mongoose.connection.close();

}

});

/*shows all companies along with the status(which companies student registered for) of student*/
router.get('/dashboard', function(req, res){
	console.log('i am company');
	console.log(req.session.student.color);
	var color = req.session.student.color;
  	var url = 'mongodb://localhost:27017/company';
		if(req.session.student)
		{
			console.log("logged in");
			
  			mongoose.connect(url);
  			console.log("connection established");
			
			companyData.find( {}, function(err, result){
						if(err)
						{}
						else if(result.length)
						{
							console.log(result);
							console.log( color );
		            		
		            		res.render('registered', {"data": result, "st_data":color} );
		        		}
		        		else
		        		{
		        			console.log('No companies registered');
		        			req.flash('companies', 'No companies registered');
		        			res.redirect('/student_login');
		        		}
						
					});
			mongoose.connection.close();
			}
		else
		{
			console.log("not logged in");	
		}				
});



module.exports = router;