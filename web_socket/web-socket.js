var WebSocketServer = require("ws").Server;

function WebSocket(server) {
	this.clients = [];
	this.wss = new WebSocketServer({server: server});

	var me = this;
	this.wss.on('connection', function connection(ws, incomingMsg) {

		//NEW Check headers in incomingMsg for cookie

		me.clients.push(ws);

		ws.on('message', function incoming(message) {
			console.log('received: %s', message);
			for (var i = 0; i < me.clients.length; i++) {
				var otherClient =  me.clients[i];

				if (otherClient != ws) {
					otherClient.send(message);
				}
			}
		});

		ws.on('close', function close() {
			var index = me.clients.indexOf(this);
			if (index != -1) {
				me.clients.splice(index, 1);
			}
		});

		ws.send('You connected to our server');
	});
}

module.exports = {
	WebSocket: WebSocket
}
