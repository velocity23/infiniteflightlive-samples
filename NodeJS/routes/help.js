'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', async function (req, res) {
    res.contentType("text/html");
    fs.readFile(__dirname + "/../views/Help.html", function (err, data) {
        res.end(data);
    });
});

module.exports = router;
