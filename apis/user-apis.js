var express = require("express");
var sys = require('util');
var exec = require('child_process').exec;
var Async = require('async');
var User = require('../database/schemas/user');

var verifyUserMiddleware = function(req, res, next) {
    //TODO: Verify user here, all APIs will require user_token in reques
    console.log("Verify user midleware");
    next();
}

var router = express.Router();

router.route("/user")

    .get(function(req, res) {
        console.log("Get User API is called");
        process.nextTick(function () {
            User.find(function(err, users) {
                if (err)
                    res.send(err);
                res.json(users);
            });
        });
    })

    /**
     * Register new user - POST /user
     * parameters:
     * + username (required)
     * + password (required)
     * + email (not required)
     */
    .post(function(req, res) {
        var params = req.body;
        if (params.username && params.password) {
            var user = new User();
            user.username = params.username;
            user.password = params.password;
            if (params.email) {
                user.email = params.email;
            }
            process.nextTick(function() {
                user.save(function (err) {
                    if (err) {
                        res.json({
                            error: error
                        });
                    } else {
                        res.json({
                            registed_user: user
                        });
                    }
                });
            });
        } else {
            res.json({
                errorMsg: "Username and password are required"
            });
        }
    });

router.route("/user/authenticate")
    .post(function(req, res) {

    });


    //END Define APIs


module.exports = router;
