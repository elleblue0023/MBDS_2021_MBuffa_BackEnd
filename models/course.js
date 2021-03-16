let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CourseSchema = Schema({
    name: String 
},{
	collection: 'course'
});

module.exports = mongoose.model('Course', CourseSchema);