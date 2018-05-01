import * as express from 'express';
import * as path from 'path';
import app from './src/app';

// Create a link to the Angular build directory.
app.use(express.static(path.join(__dirname, './dist')));

// Set 'res' route to publish our public resources.
app.use('/res', express.static(path.join(__dirname, './res')));

// Redirect to root when trying to get the resources folder itself.
app.get('/res', function(req, res) {
  res.redirect('/');
});
