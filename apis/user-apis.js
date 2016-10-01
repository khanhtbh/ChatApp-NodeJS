var express = require("express");
var sys = require('util');
var exec = require('child_process').exec;

var userAPIs = {
	"/:username": function(req, res) {
		res.send({
			msg: "Test user API - username: " + req.params.username
		});
	}
}

module.exports = function() {
    console.log("User APIs init");
    var router = express.Router();
    for (var path in userAPIs) {
        router.use(path, userAPIs[path]);
    }
    return router;
}
