'use strict';
const express = require('express');
const router = express.Router();
const infiniteflight = require('../InfiniteFlightLive');

router.get('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_DOMAIN);
    res.contentType('application/json');

    let data;
    try {
        data = JSON.stringify(await infiniteflight.tracks(req.query.server));
    } catch {
        res.status(500);
        data = JSON.stringify({
            error: 500,
            text: 'Internal Server Error',
        });
    } finally {
        res.write(data);
        res.end();
    }
});

module.exports = router;
