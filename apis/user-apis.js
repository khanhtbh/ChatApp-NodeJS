var express = require("express");
var sys = require('util');
var exec = require('child_process').exec;
var Async = require('async');
var User = require('../business/user/user');

var verifyUserMiddleware = function(req, res, next) {
    //TODO: Verify user here, all APIs will require user_token in reques
    console.log("Verify user midleware");
    next();
}

var router = express.Router();

router.route("/users")

    .get(function(req, res)) {
        process.nextTick(function () {
            User.find(function(err, users) {
                if (err)
                    res.send(err);
                res.json(users);
            });
        });
        
    })

    /**
     * Register new user POST /users
     */
    .post(function(req, res) {
        var params = req.body;
        if (params.username && params.password) {
            var user = new User();
        }
        
    });
    //END Define APIs


module.exports = router;
