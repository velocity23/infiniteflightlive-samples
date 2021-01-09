'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_DOMAIN);

    res.contentType('application/json');
    let data = JSON.stringify({
        description: 'Infinite Flight Live API NodeJS Sample',
        author: 'Kai Malcolm',
        version: '1.0.0',
    });
    res.write(data);
    res.end();
});

module.exports = router;
