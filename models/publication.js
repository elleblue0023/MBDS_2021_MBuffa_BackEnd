let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate-v2');

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

publicationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Publication', publicationSchema);