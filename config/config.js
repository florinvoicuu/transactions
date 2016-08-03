'use strict';

var path = require('path');

module.exports = {
    env: process.env.NODE_ENV || 'test',
    root: path.normalize(__dirname + '/..'),
    port: process.env.SCOUTSOCIETY_PORT || 3000,
    ip: process.env.IP || null,
    mongodb: {
        uri: process.env.NODE_ENV === 'test' ?
            'mongodb://localhost/transactions' :
            (process.env.abc_MONGODB || 'mongodb://localhost/transactions'),
        options: {
            db: {
                safe: true
            }
        }
    },
    session_secret: process.env.SESSION_SECRET || 'mysecretsession'
};