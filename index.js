var express = require("express");
var app = require('./src/app');

// Create a link to the Angular build directory.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
