let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let promotionSchema = Schema({
    name: String 
},{
	collection: 'promotion'
});

module.exports = mongoose.model('Promotion', promotionSchema);