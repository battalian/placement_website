var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET home page. */
/*Shows student registration form along with some errors*/
router.get('/', function(req, res) {
  res.render('student_register', {"email":req.flash('email'), "email_registered":req.flash('email_registered'), "registration":req.flash('registration')});
});

module.exports = router;