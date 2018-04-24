var express = require("express");
var path = require('path');
var app = require('./src/app');

// Create a link to the Angular build directory.
app.use(express.static(path.join(__dirname, 'dist')));

// Set 'res' route to publish our public resources.
app.use('/res', express.static(path.join(__dirname, 'res')));

// Redirect to root when trying to get the resources folder itself.
app.get('/res', function(req, res) {
  res.redirect('/');
});
