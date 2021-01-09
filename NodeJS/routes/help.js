'use strict';
const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', async (_, res) => {
    res.contentType('text/html');
    fs.readFile(__dirname + '/../views/Help.html', function (_, data) {
        res.end(data);
    });
});

module.exports = router;
