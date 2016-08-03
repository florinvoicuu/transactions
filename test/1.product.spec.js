'use strict';

var expect  = require('chai').expect;
var mongoose = require('mongoose');
var co       = require('co');

var config  = require('../config/config');
var request = require('./request');
var CRUD    = require('./CRUD');
var sample  = require('./sample')(request);
var util    = require('./util');

var Product    = require(config.root + '/api/product/model');

require('..'); // Start it up

var uri = '/api/product';
var crud = new CRUD({
    uri: uri,
    request: request,
    properties: ['user', 'name', 'cost', 'description', 'image']
});

describe('Product', function () {
    this.timeout(10000);
    // Clear relevant collections
    before(done => co(function *() {
        yield new Promise(resolve => mongoose.connection.collections['users'].drop(resolve));
        yield new Promise(resolve => mongoose.connection.collections['products'].drop(resolve));
        
        yield request({ uri: '' });

        //Create a user so that the test is self sufficient
        yield request({ uri: `/api/user`, method: 'POST', body: sample.user(++crud.inc) });

        done();
    }));

    // CRUD
    let res;
    describe(`POST ${uri}`, () => {
        it(`should create a product`, () => co (function *() {
            res = yield crud.createResource(sample.product());
        }));
    });

    describe(`GET ${uri}/:id`, () => {
        it(`should retrieve a product`, () => co (function *() {
            yield crud.retrieveResource();
        }));
    });

    describe(`PUT ${uri}/:id`, () => {
        it(`should update a product`, () => co (function *() {
            yield crud.updateResource(sample.product(res.body.user));
        }));
    });

    describe(`DELETE ${uri}/:id`, () => {
        it(`should delete a product`, () => co (function *() {
            yield crud.deleteResource();
        }));
    });

    // Collection
    describe(`GET ${uri}`, () => {
        it(`should retrieve a range of products`, () => co (function *() {
            yield crud.retrieveRange(inc => co (function *() {
                return (yield request({ uri: uri, method: 'POST', body: yield sample.product()(inc) })).body
            }), 'products');
        }));
    });


    // Other

});