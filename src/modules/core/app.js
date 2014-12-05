'use strict';
/**
 * Module dependencies.
 */

var express = require('express'),
    h5bp = require('h5bp');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

var app = express();
app.use(h5bp({ root: __dirname + '/www' }));

// in order to serve files, you should add the two following middlewares
app.use(express.compress());
app.use(express.static(__dirname + '/www'));
app.listen(3000);

// Logging initialization
console.log('Application started on port 3000');
