var server          = require('http').createServer()
  , url             = require('url')
  , WebSocketServer = require('ws').Server
  , wss             = new WebSocketServer({ server: server })
  , express         = require('express')
  , app             = express()
  , port            = 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

var connectedWS = [];

wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);
  console.log("connected socket: ", ws.upgradeReq.url);
  connectedWS.push(ws);
  // console.log("Connected clients: ", connectedWS);
  // you might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    for (var i = 0; i < connectedWS.length; i++) {
      var otherClient = connectedWS[i];
              // otherClient.send(message);
      if (otherClient != ws) {
        otherClient.send(message);
      }
    }
  });

  ws.send('something');
});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });