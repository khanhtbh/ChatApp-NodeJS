var fs = require('fs')
 ,	WebSocket = require('../web_socket/web-socket').WebSocket;

class Server {
	constructor(configs, options) {
		this.serverInstance;
		if (configs.port) {
			this.port = configs.port;
		}
		else {
			this.port = 3000;
		}
		this.useWebSocket = options.webSocket;
		if (configs.ssl) {
			var serverOptions = {
				key: fs.readFileSync(configs.certificate.key),
				cert: fs.readFileSync(configs.certificate.cert)
			};
			this.serverInstance = require('https').createServer(serverOptions, options.expressApp);
		}
		else {
			this.serverInstance = require('http').createServer(options.expressApp);
		}
		if (this.serverInstance) {
			if (options.webSocket) {
				this.webSocket = new WebSocket(this.serverInstance);
			}
		}
	}
	start(callback) {
		if (this.serverInstance) {
			this.serverInstance.listen(this.port, callback);
		}
	}
}


module.exports = {
	Server: Server
}