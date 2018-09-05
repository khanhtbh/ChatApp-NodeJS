var WebSocketServer = require("ws").Server;

/**
 * 
 * var parseCookie = express.cookieParser();
 * parseCookie(ws.upgradeReq, null, function(err) {
        var sessionID = ws.upgradeReq.cookies['sid'];
        store.get(sessionID, function(err, session) {
            // session
        });
    }); 
	http://stackoverflow.com/questions/11541835/how-can-i-get-expresss-sessionid-for-a-websocket-connection
 */

function WebSocket(server) {
	this.clients = [];
	this.wss = new WebSocketServer({server: server});

	var me = this;
	this.wss.on('connection', function connection(ws, incomingMsg) {
		// console.log("Connected clients: ", me.clients);
		// Check this ws.upgradeReq.headers.cookie for cookies
		// you might use location.query.access_token to authenticate or share sessions
		// or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

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

		ws.send('You connected to our server');
	});
}

module.exports = {
	WebSocket: WebSocket
}
