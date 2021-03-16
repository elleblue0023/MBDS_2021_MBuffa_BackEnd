let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PromotionSchema = Schema({
    name: String 
},{
	collection: 'promotion'
});

module.exports = mongoose.model('Promotion', PromotionSchema);