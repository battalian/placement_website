var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* creating company database schema and exporting to other files*/

var companyDataSchema = new Schema({
	company : String,
	designation : String,
	package : Number,
	location : String,
	password : String
}, { minimize: false });


module.exports = mongoose.model('companyData', companyDataSchema, 'student');