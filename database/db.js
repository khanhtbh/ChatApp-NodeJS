var assert = require('assert');

function DB(databaseName) {
	this.mongoClient = require('mongodb').MongoClient;
	this.dbName = databaseName;
}

DB.prototype.connect = function(callback) {
	// Use connect method to connect to the server
	var me = this;
	this.mongoClient.connect("mongodb://localhost:27017/" + this.dbName, function(err, db) {
		assert.equal(null, err);
		// console.log("Connected to database: ", db);
		me.dbInstance = db;
		// db.close();
		callback(err);
	});
}

DB.prototype.close = function() {
	if (this.dbInstance) {
		this.dbInstance.close();
	}
}

DB.prototype.find = function(collectionName, query, resultCallback) {
	if (!this.dbInstance) {
		return resultCallback([]);
	}
	return this.dbInstance.collection(collectionName).find(query).toArray();
}

module.exports = {
	DB: DB
}