let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let courseSchema = Schema({
    name: String 
},{
	collection: 'course'
});

module.exports = mongoose.model('Course', courseSchema);