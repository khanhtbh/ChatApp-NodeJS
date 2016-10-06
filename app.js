var async = require('async')
  , bodyParser = require('body-parser')
  , express = require('express');

var DB = require('./database/db')
  , Server = require('./server/server').Server
  , APIs = require('./apis/apis');

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
		// configure app to use bodyParser()
		// this will let us get the data from a POST
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());
		app.use(express.static(__dirname + '/client'));
		app.use("/api", APIs());

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



