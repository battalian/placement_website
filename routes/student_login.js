var express = require('express');
var router = express.Router();
var session = require('express-session');
var mongodb = require('mongodb');
var flash = require('connect-flash');


/* GET home page. */
/*Shows student login form along with some error messages*/
router.get('/', function(req, res) {
  
  res.render('student_login', {"errors": req.flash('errors'), "noEmail":req.flash('noEmail'), 'incorrectPassword':req.flash('incorrectPassword'), 'companies':req.flash('companies') });
  console.log('sdvdsfcesfces');
  
});

module.exports = router;