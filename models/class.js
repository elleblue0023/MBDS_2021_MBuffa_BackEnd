let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ClassSchema = Schema({
    class_name: String 
});

module.exports = mongoose.model('class', ClassSchema);