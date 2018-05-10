'use strict';
const express = require('express');
const path = require('path');
const logger = require('winston');
const expressWinston = require('express-winston');
const bodyParser = require('body-parser');
const apiController = require('./controller/apiController');
require("./config/db.js");

const tsFormat = () => (new Date()).toLocaleTimeString();

// Config NodeJS logger
logger.configure({
    transports: [
        new(logger.transports.File)({
            filename: 'node_log.log',
            timestamp: tsFormat
        })
    ]
});

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(expressWinston.logger({
    transports: [
        new logger.transports.File({
            filename: 'express_log.log',
            timestamp: tsFormat
        })
    ],
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
        return false;
    } // optional: allows to skip some log messages based on request and/or response
}));

app.use(express.static(path.join(__dirname + 'dist')));

app.use('/', function (req, res, next) {
    next();
});

app.use('/api', apiController);

// point to the client UI in Angular2
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(port);
