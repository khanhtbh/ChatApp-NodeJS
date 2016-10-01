var assert = require('assert');
var mongoClient = require('mongodb').MongoClient;
var	configs = require('../configs.json');

module.exports = {
	dbName: configs.dbName,
	checkConnect: function(callback) {
		// Use connect method to connect to the server
		var me = this;
		mongoClient.connect("mongodb://localhost:27017/" + this.dbName, function(err, db) {
			assert.equal(null, err);
			// console.log("Connected to database: ", db);
			me.db = db;
			callback(err);
		});
	},
	find: function(collectionName, query, resultCallback) {
		var me = this;
		// mongoClient.connect("mongodb://localhost:27017/" + this.dbName, function(err, db) {
		// 	assert.equal(null, err);
			this.db.collection(collectionName).find(query).toArray(
				function(error, results) {
					assert.equal(null, error);
					resultCallback(error, results);
					// db.close();
				}
			);
		// });
	}
}