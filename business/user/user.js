/*
	TODO: Implement the User model
	A User should have: 
	+ username
	+ ....
*/

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    userName: String
});

//Map User schema to Users collection
module.exports = mongoose.model('User', UserSchema, 'Users');