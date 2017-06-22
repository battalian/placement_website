var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var session = require('client-sessions');
var validator = require('express-validator');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var cors = require('cors');

// use it before all route definitions
var app = express();

//app.use(cors({origin: 'http://localhost:8100'}));


var routes = require('./routes/index');
var company_login = require('./routes/company_login');
var company_register = require('./routes/company_register');
var student_register = require('./routes/student_register');
var student_login = require('./routes/student_login');
var myaction = require('./routes/myaction');
var myaction2 = require('./routes/myaction2');
var myaction3 = require('./routes/myaction3');
var myaction4 = require('./routes/myaction4');
var myaction5 = require('./routes/myaction5');
var update_registrations = require('./routes/update_registrations');
var edit_details = require('./routes/edit_details');
var student_logout = require('./routes/student_logout');
var company_logout = require('./routes/company_logout');

var student_edits = require('./api/student_edits');
var student_list = require('./api/student_list');
var student_registration = require('./api/student_registration');
var company_list = require('./api/company_list');
var company_registration = require('./api/company_registration');
var company_edits = require('./api/company_edits');
var registered_students = require('./api/registered_students');
var student_company_registration = require('./api/student_company_registration');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(validator());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
app.use(flash());



app.use('/myaction', myaction);
app.use('/myaction2', myaction2);
app.use('/myaction3', myaction3);
app.use('/myaction4', myaction4);
app.use('/myaction5', myaction5);
app.use('/dashboard', myaction);
app.use('/student_logout', student_logout);
app.use('/company_logout', company_logout);
app.use('/update_registrations', update_registrations);
app.use('/student_register', student_register);
app.use('/student_login', student_login);
app.use('/', routes);
app.use('/company_login', company_login);
app.use('/company_register', company_register);
app.use('/edit_details', edit_details);
app.use('/student_list', student_list);
app.use('/student_registration', student_registration);
app.use('/student_edits', student_edits);
app.use('/company_list', company_list);
app.use('/company_registration', company_registration);
app.use('/company_edits', company_edits);
app.use('/registered_students', registered_students);
app.use('/student_company_registration', student_company_registration);






//app.use('/index', routes);

/// catch 404 and forwarding to error handler
/*app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}); 

/*app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*"); 
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type'); 
  next();
})*/

app.use(function (req, res, next) {

    // Website you wish to allow to connect
  //  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
