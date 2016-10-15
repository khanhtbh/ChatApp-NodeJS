var express = require("express");
var UserAPIs = require("./user-apis");

module.exports = function() {
	console.log("Init APIs");
	var router = express.Router();
	router.use(function(req, res, next){
		next();
	});
	router.use(UserAPIs());
	return router;
}
