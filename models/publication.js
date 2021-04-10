let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let publicationSchema = Schema({
	professor: { type: Schema.Types.ObjectId, ref: 'Professor' },
	name: String, 
	message: String,
	promotionName: String,
	courseName: String,
	deadline: Date
}, {
	collection: 'publication'
});

module.exports = mongoose.model('Publication', publicationSchema);