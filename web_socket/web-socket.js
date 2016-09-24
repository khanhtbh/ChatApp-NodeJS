var WebSocketServer = require("ws").Server;
var url 			= require('url')

function WebSocket(server) {
	this.clients = [];
	this.wss = new WebSocketServer({server: server});

	var me = this;
	this.wss.on('connection', function connection(ws) {
		var location = url.parse(ws.upgradeReq.url, true);
		console.log("connected socket: ", ws.upgradeReq.url);
		me.clients.push(ws);
		// console.log("Connected clients: ", me.clients);
		// you might use location.query.access_token to authenticate or share sessions
		// or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

		ws.on('message', function incoming(message) {
			console.log('received: %s', message);
			for (var i = 0; i < me.clients.length; i++) {
				var otherClient =  me.clients[i];

				if (otherClient != ws) {
					otherClient.send(message);
				}
			}
		});

		ws.send('You connected to our server');
	});
}

module.exports = {
	WebSocket: WebSocket
}
