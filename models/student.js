let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let studentSchema = Schema({
	lastname: String,
	surname: String, 
	email: String,
	password: String,
	isConnected: Boolean, 
	promotionName: String
},{
	collection: 'student'
});

module.exports = mongoose.model('Student', studentSchema);