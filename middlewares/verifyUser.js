var verifyUserMiddleware = function(req, res, next) {
    //TODO: Verify user here, all APIs will require user_token in request
    console.log("Verify user midleware");
    next();
}

module.exports = verifyUserMiddleware;