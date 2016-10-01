var async = require('async');
var express = require('express');

var DB = require('./database/db');
var Server = require('./server/server').Server;
var APIs = require('./apis/apis');

var	configs = require('./configs.json');

async.waterfall([
	function(callback) {
		console.log("CHECKING CONNECTION TO DATABASE...");
		DB.checkConnect(function(err){
			/* 
				pass the connection err as the err param for callback, 
				so if the database connection was failure, the start server function will not be call
			*/
			var initDbResult = {
				err: err,
				msg: !err ? "Connected to database" : "Failed to connect to database",
			}
			callback(err, initDbResult);
		});
	},
	function(initDbResult, callback) {
		console.log("CONNECTION TO DB IS OK!\n");
		console.log("STARTING MAIN SERVER...");
		var app = express();
		app.use(express.static(__dirname + '/client'));
		app.use(APIs());
		
		DB.find("Users", {userName: "kei"}, function(error, results){
			console.log("test find user Kei, result: ", results);
		});
		var server = new Server(configs, {
			expressApp: app,
			webSocket: true
		});
		server.start(function(){
			callback(null, {
				msg: "SERVER STARTED"
			});
		});
	}
], function(err, results){
	console.log("START SERVER PROCESS RESULT: ", results);
});



