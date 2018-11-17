var configs = require("../configs.json");
var User = require("../database/schemas/user");
var jwt = require("jsonwebtoken");
var apiCodes = require("../constants/error-codes");
require("../utils/api-utils").apiRespond;

module.exports = {
    findAllUser: function(req, res) {
        User.find(function(err, users) {
            if (err) {
                res.apiRespond(apiCodes.generalErr, "Error", {});
            } else {
                res.apiRespond(apiCodes.success, "Success", users);
            }          
        });
    },

    /**
     * Register new user - POST /user
     * parameters:
     * + username (required)
     * + password (required)
     * + email (not required)
     */
    register: function(req, res) {
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
    },

    authenticate: function(req, res) {
        var params = req.body;
        if (params.username && params.password) {
            User.findOne({username: params.username}, function (error, user) {
                if (error) {
                    res.apiRespond(apiCodes.generalErr, "Something went wrong", {});
                } 
                else if (user) {
                    try {
                        let isMatch = user.comparePassword(params.password);
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
                    }
                    catch (e) {
                        res.apiRespond(apiCodes.generalErr, "Something went wrong", {});
                    }
                }
                else {
                    res.apiRespond(apiCodes.notFoundErr, "User not found", {});
                }
            });
        } 
    }
}