var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var session = require('express-session');
var bunyan = require('bunyan');

/* logging out the company by desroying their sessions and redirecting to home page*/
router.get('/', function(req, res) {
	
	console.log(req.session);
	var log = bunyan.createLogger({
    	name: 'company:' + req.session.company.company,
    	streams: [{
        	path: '/var/log/Placement_portal.log',
    			}]
					});
		log.info(req.session.company.company + ' was logged out ');
	req.session.destroy();
	res.redirect('/');
  	
});

module.exports = router;