var express = require('express'),
    router = express.Router(),
    db = require('../models/index');

module.exports = function(req, res) {
    res.render("profile", { user: req.user ,auth:true });
};
