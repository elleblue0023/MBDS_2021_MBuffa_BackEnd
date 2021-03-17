let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let crypto = require('crypto');

let professorSchema = Schema({
    lastname: String,
    surname: String,
    email: String,
    password: String,
    isConnected: Boolean,
    occupation: [{course: String, promotion: String}] 
}, {
    collection: 'professor'
});

module.exports = mongoose.model('Professor', professorSchema);