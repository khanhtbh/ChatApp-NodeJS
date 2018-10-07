var respond = require("../apis/api-utils").apiRespond;
var apiCodes = require("../apis/error-codes");
var configs = require("../configs.json");
var jwt = require("jsonwebtoken");

var checkToken = function(req, res, next) {
    var token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, configs.secretKey, function(err, decoded) {
            if (err) {
                res.apiRespond(apiCodes.unauthorized, "Unauthorized", {});
            } else {
                next();
            }
        });
    } else {
        res.apiRespond(apiCodes.unauthorized, "Unauthorized", {});
    }
}

var verifyUserMiddleware = function(req, res, next) {
    //TODO: Verify user here, all APIs will require user_token in request
    console.log("Verify user midleware");
    
    if (
        (req.path == "/users" && req.method == "POST") 
        || (req.path == "/authenticate" && req.method == "POST")
    ) {
      next();  
    } else {
        checkToken(req, res, next);
    }
}

module.exports = verifyUserMiddleware;