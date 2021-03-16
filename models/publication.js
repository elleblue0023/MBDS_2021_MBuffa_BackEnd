let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let publicationSchema = Schema({
    professor: { type: Schema.Types.ObjectId , ref: 'Professor'},
    message: String,
    class: { type: Schema.Types.ObjectId , ref: 'Class'},
    course: { type: Schema.Types.ObjectId , ref: 'Course'},
    deadline: Date
},{
    collection: 'publication'
});

module.exports = mongoose.model('Publication', publicationSchema);