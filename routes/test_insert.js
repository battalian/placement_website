var mongoose = require('mongoose');
var studentData = require('./student_models.js');
var companyData = require('./company_models.js');
var url = 'mongodb://localhost:27017/student_details';

mongoose.connect(url);

var item = new studentData({
	name : 'chiru',
	email : 'chiru90@gmail.com',
	cgpa : 3,
	stream : 'TO',
	password : 'harish',
	registered : [],
	color : {}
	
});
console.log('esgv2');
						//var data = new studentData(item);
	item.save(function (err, data) {
		if (err) console.log(err);
		else console.log('Saved : ', data );
	});

console.log('esgv1');
mongoose.connection.close();
