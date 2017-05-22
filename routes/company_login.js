var express = require('express');
var router = express.Router();

/* GET home page. Route to get the home company login form along with some error handling messages*/
router.get('/', function(req, res) {
  res.render('company_login', {"company":req.flash('company'), "password":req.flash('password')});
});

module.exports = router;