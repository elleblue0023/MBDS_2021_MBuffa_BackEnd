let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let assignmentSchema = Schema({
	student: { type: Schema.Types.ObjectId, ref: 'Student'}, 
	promotionName: String,
	courseName: String,
	note: Number,
	projectUrl: String,
    doneDate: Date,
    name: String,
    isDone: Boolean
},{
	collection: 'assignment'
});

module.exports = mongoose.model('Assignment', assignmentSchema);
