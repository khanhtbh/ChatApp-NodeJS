var assert = require('assert');
var mongoClient = require('mongodb').MongoClient;
var	configs = require('../configs.json');

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/" + configs.dbName);

module.exports = {
	dbName: configs.dbName,
	checkConnect: function(callback) {
		var me = this;
		var db = mongoose.connection;
		db.on('error', function () {
			callback({error: arguments});		
		});
		db.once('open', function() {
			callback(null);
		});
	}
}