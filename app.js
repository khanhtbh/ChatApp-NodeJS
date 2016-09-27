var async = require('async');
var express = require('express');

var DB = require('./database/db').DB;
var Server = require('./server/server').Server;

var	configs = require('./configs.json');

async.waterfall([
	function(callback) {
		console.log("CONNECTING TO DATABASE...");
		var db = new DB(configs.dbName);
		db.connect(function(err){
			/* 
				pass the connection err as the err param for callback, 
				so if the database connection was failure, the start server function will not be call
			*/
			var initDbResult = {
				err: err,
				msg: !err ? "Connected to database" : "Failed to connect to database",
				DB: db
			}
			callback(err, initDbResult);
		});
	},
	function(initDbResult, callback) {
		console.log("STARTING MAIN SERVER...");
		var app = express();
		app.use(express.static(__dirname + '/client'));

		var server = new Server(configs, {
			expressApp: app,
			webSocket: true
		});
		var db = initDbResult.DB;
		server.start(function(){
			var searchResult = db.find("Users", {userName: "kei"});
			console.log("Test Search on DB: ", searchResult);
			callback(null, {
				msg: "server started"
			});
		});
	}
], function(err, results){
	console.log("start server process result: \n", results);
});



