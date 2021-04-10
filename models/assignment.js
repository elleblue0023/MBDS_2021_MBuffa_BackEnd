let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let assignmentSchema = Schema({
	student: { type: Schema.Types.ObjectId, ref: 'Student'}, 
	publication: { type: Schema.Types.ObjectId, ref: 'Publication'}, 
	note: Number,
	remark: String,
  doneDate: Date,
  name: String,
	depositUrl: String,
  isMarked: Boolean
},{
	collection: 'assignment'
});

module.exports = mongoose.model('Assignment', assignmentSchema);
