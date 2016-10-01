var express = require("express");
var sys = require('util');
var exec = require('child_process').exec;
var Async = require('async');
var DB = require('../database/db');

var verifyUserMiddleware = function(req, res, next) {
    //TODO: Verify user here, 
    console.log("Verify user midleware");
    next();
}

var userAPIs = {};

userAPIs["/:username"] = function(req, res) {
    if (req.params.username) {
        switch (req.method) {
            case "GET": {
                var username = req.params.username;
                DB.find("Users", {userName: username}, function(error, results){
                    res.json({
                        error: error,
                        msg: "Test user API - username: " + username,
                        searchResult: results
                    });
                });
                break;
            }
        }
    }
}


module.exports = function() {
    console.log("User APIs init");
    var router = express.Router();

    //Verify user in every request
    router.use(verifyUserMiddleware);
    //Init API routes
    for (var path in userAPIs) {
        router.use(path, userAPIs[path]);
    }
    return router;
}
