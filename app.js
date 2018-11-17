var bodyParser 		= require('body-parser')
  , express 		= require('express')
  , cookieParser 	= require('cookie-parser');

var DB 		= require('./database/db')
  , Server 	= require('./server/server').Server
  , APIs 	= require('./apis/apis')
  , configs 	= require('./configs.json');

var connectDb = async () => {
	let promise = new Promise((resolve, reject) => {
		console.log("CHECKING CONNECTION TO DATABASE...");
		DB.checkConnect(function(err){
			var initDbResult = {
				err: err,
				msg: !err ? "Connected to database" : "Failed to connect to database",
			}
			resolve(initDbResult);
		});
	});

	return await promise;
}

let startServer = () => {
	console.log("STARTING MAIN SERVER...");

	var app = express();
	//configure app to use cookieParser()
	//this helps set cookie to response and get cookie from request quickly
	app.use(cookieParser());
	// configure app to use bodyParser()
	// this helps us get the data from a POST
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use(express.static(__dirname + '/client'));
	//connect all APIs
	app.use("/api", APIs());

	var server = new Server(configs, {
		expressApp: app,
		webSocket: true
	});
	
	server.start(function() {
		console.log("SERVER STARTED");
	});
}

let connectDbResult = connectDb();

if (!connectDbResult.err) {
	console.log("CONNECTION TO DB IS OK!\n");
	startServer();
} else {
	console.log(connectDbResult.msg);
}
