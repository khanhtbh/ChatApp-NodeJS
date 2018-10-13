var	configs = require('../configs.json');

var mongoose = require('mongoose');
mongoose.connect("mongodb://chatAppDbUser:userPass123@localhost:27017/" + configs.dbName, {
	useCreateIndex: true,
	useNewUrlParser: true
});

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