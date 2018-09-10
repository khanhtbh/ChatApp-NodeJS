/*
	TODO: Implement the User model
	A User should have: 
	+ username
	+ ....
*/

var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;

//The collection name in MongoDB
var DBCollectionName = 'Users';

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        require: false
    },

    gender: {
        type: Number,
        require: false
    },

    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }

});


UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});


UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err, false);
        }
        cb(null, isMatch);
    });
};

//Map User schema to Users collection
module.exports = mongoose.model('User', UserSchema, DBCollectionName);