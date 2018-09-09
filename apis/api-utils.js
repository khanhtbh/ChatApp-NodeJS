var express = require("express");

express.response.apiRespond = function(code, message, data) {
    this.json({
        code: code,
        msg: message,
        data: data
    });
}