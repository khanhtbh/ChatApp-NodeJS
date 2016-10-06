var express = require("express");
var sys = require('util');
var exec = require('child_process').exec;
var Async = require('async');
var User = require('../business/user/user');

var verifyUserMiddleware = function(req, res, next) {
    //TODO: Verify user here, 
    console.log("Verify user midleware");
    next();
}

var userAPIs = {};

userAPIs["/"] = function(req, res) {
     switch (req.method) {
        case "GET": {
            User.find(function(err, users) {
                if (err)
                    res.send(err);
                res.json(users);
            });
            break;
        }
    }
}

userAPIs["/:username"] = function(req, res) {
    if (req.params.username) {
        switch (req.method) {
            case "GET": {
                var username = req.params.username;
                
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
