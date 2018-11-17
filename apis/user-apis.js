var express = require("express");
var configs = require("../configs.json");
var User = require("../database/schemas/user");
var jwt = require("jsonwebtoken");
var apiCodes = require("../constants/error-codes");
var respond = require("../utils/api-utils").apiRespond;
var UserController = require("../controllers/UserController");

var router = express.Router();

router.route("/users")

    .get(UserController.findAllUser)

    /**
     * Register new user - POST /user
     * parameters:
     * + username (required)
     * + password (required)
     * + email (not required)
     */
    .post(UserController.register);


router.route("/authenticate")
    
    .post(UserController.authenticate);


module.exports = router;
