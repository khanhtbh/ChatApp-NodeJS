var express = require("express");

//APIs
var UserAPIs = require("./user-apis");

//Middlewares
var verifyUser = require("../middlewares/verifyUser");

module.exports = function() {
	console.log("Init APIs");
	var router = express.Router();
	router.use(function(req, res, next){
		next();
	});

	//Middlewares
	router.use(verifyUser);

	//APIs
	router.use(UserAPIs);
	return router;
}
