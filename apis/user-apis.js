var express = require("express");
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
