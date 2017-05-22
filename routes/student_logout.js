var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var session = require('express-session');
var bunyan = require('bunyan');

/* GET home page. */
/*Logging out the student by destroying the session of the student*/
router.get('/', function(req, res) {
	console.log('finale');
	console.log(req.session);
	
	var log = bunyan.createLogger({
    	name: 'student:'+ req.session.student.email,
    	streams: [{
        	path: '/var/log/Placement_portal.log',
    			}]
					});
		log.info(req.session.student.email + ' was logged out ');
	
	req.session.destroy();
	res.redirect('/');
  
});

module.exports = router;