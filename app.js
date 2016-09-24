var server          = require('http').createServer()
  , WebSocket       = require('./web_socket/web-socket').WebSocket
  , express         = require('express')
  , app             = express()
  , port            = 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

var webSocket = new WebSocket(server);

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });