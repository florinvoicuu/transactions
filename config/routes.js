'use strict';

var sanitize  = require('sanitize-html');
var jwt       = require('jsonwebtoken');

var config    = require('./config');

module.exports = function (app, express) {
    app.all('/*', addUser);  // Add authenticated user to req

    app.use('/api/user', require(config.root + '/api/user')(express));
    app.use('/api/product', require(config.root + '/api/product')(express));
    app.use('/api/transaction', require(config.root + '/api/transaction')(express));


   // app.post('/signup', require(config.root + '/api/user')(express));




    app.get('/*', (req, res) => res.sendFile(config.root + '/public/index.html'));
    app.all('/*', (req, res) => res.status(500).send('Route does not exist.'));
};

function addUser(req, res, next) {
    jwt.verify(req.cookies['jwt'], config.session_secret, function(err, user) {
        req.user = user || {};
        next();
    });
}