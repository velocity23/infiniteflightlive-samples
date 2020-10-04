'use strict';
var express = require('express');
var router = express.Router();

var infiniteflight = require('../InfiniteFlightLive');

router.get('/', async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_DOMAIN);
    res.contentType("application/json");

    var data;
    if (typeof req.query.user === 'undefined' || !req.query.user) {
        res.status(400);
        data = JSON.stringify({
            "error": 400,
            "text": "Bad Request"
        });
    } else {
        try {
            data = JSON.stringify(await infiniteflight.gradeTable(req.query.user));
        } catch {
            res.status(500);
            data = JSON.stringify({
                "error": 500,
                "text": "Internal Server Error"
            });
        }
    }

    res.write(data);
    res.end();
});

router.post('/stats', async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_DOMAIN);
    res.contentType("application/json");

    var data;
    if (typeof req.body['userIds[]'] === 'undefined' || !req.body['userIds[]']) {
        res.status(400);
        data = JSON.stringify({
            "error": 400,
            "text": "Bad Request"
        });
    } else {
        let users = req.body['userIds[]'];
        if (typeof users == 'string') {
            users = [users];
        }
        try {
            data = JSON.stringify(await infiniteflight.userStats(users));
        } catch {
            res.status(500);
            data = JSON.stringify({
                "error": 500,
                "text": "Internal Server Error"
            });
        }
    }

    res.write(data);
    res.end();
});

router.get('/stats/single', async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_DOMAIN);
    res.contentType("application/json");

    var data;
    if (typeof req.query.user === 'undefined' || !req.query.user) {
        res.status(400);
        data = JSON.stringify({
            "error": 400,
            "text": "Bad Request"
        });
    } else {
        let users = [req.query.user];
        try {
            data = JSON.stringify(await infiniteflight.userStats(users));
        } catch {
            res.status(500);
            data = JSON.stringify({
                "error": 500,
                "text": "Internal Server Error"
            });
        }
    }

    res.write(data);
    res.end();
});

module.exports = router;