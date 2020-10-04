'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_DOMAIN);

    res.contentType("application/json");
    let data = JSON.stringify({
        "description": "Infinite Flight Live API NodeJS Sample",
        "author": "Kai Malcolm",
        "version": "0.0.1"
    });
    res.write(data);
    res.end();
});

module.exports = router;
