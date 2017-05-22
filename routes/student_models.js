var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/* schema for student database and can be used in other files*/
var studentDataSchema = new Schema({
	name : String,
	email : String,
	cgpa : Number,
	stream : String,
	password : String,
	registered : [],
	color : {}
}, { minimize: false });



module.exports = mongoose.model('studentData', studentDataSchema, 'student');
