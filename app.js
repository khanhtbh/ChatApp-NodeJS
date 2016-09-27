var async = require('async');
var express = require('express');

var DB = require('./database/db').DB;
var Server = require('./server/server').Server;

var	configs = require('./configs.json');

var SERVER = {

}

async.series({
	initDB: function(callback) {
		var db = new DB(configs.dbName);
		SERVER.db = db; 
		db.connect(function(err){
			callback(err, {
				err: err,
				msg: !err ? "Connected to database" : "Failed to connect to database"
			});
		});
	},
	startServer: function(callback) {
		var app = express();
		app.use(express.static(__dirname + '/client'));

		var server = new Server(configs, {
			expressApp: app,
			webSocket: true
		});
		SERVER.server = server;
		server.start(function(){
			var searchResult = SERVER.db.find("Users", {name: "Kei"});
			console.log("Test Search on DB: ", searchResult);
			callback(null, {
				msg: "server started"
			});
		});
	}
}, function(err, results){
	console.log("start server process result: \n", results);
});



