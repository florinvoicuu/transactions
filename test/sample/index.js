'use strict';

var _  = require('lodash');
var co = require('co');

var util = require('../util');

module.exports = request => {
    let sample = {
        user: inc => ({
            email: `user${inc}@domain.com`,
            password: 'password'
        }),
        product: userId => inc => co(function *() {
            userId = userId ||
                (yield request({ uri: '/api/user', method: 'POST', body: yield sample.user(inc) })).body._id;

            return {
                user: userId,
                name: `Name${inc}`,
                cost: parseInt(`12345${inc}`),
                description: `Descrierea produsului ${inc}`,
                image:`My image${inc}`
            };
        }),
        transaction: userId => inc => co(function *() {
            userId = userId ||
                (yield request({ uri: '/api/user', method: 'POST', body: yield sample.user(inc) })).body._id;

            return {
                sender: userId,
                recipient: userId,
                name: `Name${inc}`,
                sum: parseInt(`12345${inc}`),
                description: `Descrierea produsului ${inc}`
            };
        })

    };

    return sample;
};
