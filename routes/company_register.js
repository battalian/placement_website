var express = require('express');
var router = express.Router();

/* Get company register form along with error handling messages  */
router.get('/', function(req, res) {
  res.render('company_register', {"company":req.flash('company'), "registration":req.flash('registration')} );
});

module.exports = router;