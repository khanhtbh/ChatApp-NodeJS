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
                res.apiRespond(apiCodes.unknownErr, "Error", {});
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
            res.json({
                errorMsg: "Username and password are required"
            });
        }
    });

router.route("/authenticate")
    .post(function(req, res) {
        var params = req.body;
        if (params.username && params.password) {
            User.findOne({username: params.username}, function (error, user) {
                if (error) {
                    res.json({
                        code: apiCodes.notFoundErr,
                        message: "User not found"
                    });
                } else {
                    delete user.password;
                    var token = jwt.sign(user.username, configs.secretKey, {
                        expiresInMinutes: 1440 // expires in 24 hours
                    }); 
                    res.json({
                        code: apiCodes.success,
                        message: "success",
                        data: {
                            user: user,
                            token: token
                        }
                    });
                }
            });
        } 
    });


    //END Define APIs


module.exports = router;
