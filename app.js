var	configs = require('./configs.json');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/client'));

var Server = require('./server/server').Server;

var server = new Server(configs, {
	expressApp: app,
	webSocket: true
});

server.start(function(){
	console.log("server started");
});
