var express = require("express");
var configs = require("../configs.json");
var User = require("../database/schemas/user");
var jwt = require("jsonwebtoken");
var apiCodes = require("./error-codes");
var respond = require("./api-utils").apiRespond;

var router = express.Router();

router.route("/users")

    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) {
                res.apiRespond(apiCodes.generalErr, "Error", {});
            } else {
                res.apiRespond(apiCodes.success, "Success", users);
            }          
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
            user.save(function (err) {
                if (err) {
                    res.apiRespond(err.code, err.errmsg, {});
                } else {
                    res.apiRespond(apiCodes.success, "Success", {registed_user: user});
                }
            });
        } else {
            res.apiRespond(apiCodes.generalErr, "Username and password are required", {});
        }
    });

router.route("/authenticate")
    .post(function(req, res) {
        var params = req.body;
        if (params.username && params.password) {
            User.findOne({username: params.username}, function (error, user) {
                if (error) {
                    res.apiRespond(apiCodes.notFoundErr, "User not found", {});
                } else {
                    user.comparePassword(params.password, function(err, isMatch) {
                        if (isMatch) {
                            user.password = undefined;
                            var payload = {
                                id: user.id,
                                username: user.username
                            }
                            var token = jwt.sign(payload, configs.secretKey, {
                                expiresIn: '2 days'
                            }); 
                            res.apiRespond(apiCodes.success, "Success", {
                                user: user,
                                token: token
                            });
                        } else {
                            res.apiRespond(apiCodes.wrongPassword, "Wrong password", {});
                        }
                    });
                    
                }
            });
        } 
    });


    //END Define APIs


module.exports = router;
