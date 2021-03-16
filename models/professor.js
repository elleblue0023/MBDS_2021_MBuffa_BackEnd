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

professorSchema.methods.setPassword = function(password) { 
// Creating a unique salt for a particular professor 
    this.salt = crypto.randomBytes(16).toString('hex'); 
    this.hash = crypto.pbkdf2Sync(password, this.salt,1000, 64, `sha512`).toString(`hex`); 
    return this.hash;
};

professorSchema.methods.validPassword = function(password) { 
    const hash = requireModel.crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash; 
}; 

module.exports = mongoose.model('Professor', professorSchema);