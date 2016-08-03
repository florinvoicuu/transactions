'use strict';

var _        = require('lodash');
var sanitize = require('sanitize-html');

var co       = require('co');
var coe      = require('../../modules/co-express');
var range    = require('../../modules/range');

var Product   = require('./model');
var User   = require('../user/model');

module.exports = {

    /**
     * Creates a new Product in the DB.
     */
    create: coe(function *(req, res) {
        if (!req.user) {
            return res.status(401).send("Not authenticated");
        }

        let product = yield Product.create(_.assign(sanitizeProduct(req.body), { user: req.user._id }));

        res.location(`/api/product/${product._id}`).status(201).json(product);
    }),

    /**
     * Get a single Product
     */
    retrieve: coe(function *(req, res) {
        if (!req.params.id) {
            return res.status(400).send('ID required');
        }

        let product = yield Product.findById(req.params.id, null, { lean: true });

        if (!product) {
            return res.status(404).end();
        }

        res.json(product);
    }),

    /**
     * Updates an existing Product in the DB.
     */
    update: coe(function *(req, res) {
        if (!req.params.id) {
            return res.status(400).send('ID required');
        }

        let product = yield Product.findByIdAndUpdate(req.params.id, { $set: sanitizeProduct(req.body) }, { lean: true, new: true });

        res.json(product);
    }),

    /**
     * Delete an Product from the DB.
     */
    delete: coe(function *(req, res) {
        if (!req.params.id) {
            return res.status(400).send('ID required');
        }

        yield Product.findByIdAndRemove(req.params.id);

        res.status(204).end();
    }),

    /**
     * Get all the user's Products
     */

    retrieveRange: coe(function *(req, res) {
        if (!req.user) {
            return res.status(401).send('Not authenticated');
        }

        let query = {};

        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: 'i' };
        }

        let r = range.parse(req.headers['range']);

        let products = yield Product.find(query, null, { lean: true, skip: r.skip, limit: r.limit, sort: '-created' });
        let count    = yield Product.count(query);

        res.set("Accept-Ranges", 'products');

        if (count && _.isEmpty(products)) {
            res.set("Content-Range", `products */${count}`);
            return res.status(416).end();
        }

        res.set("Content-Range", `products ${r.skip}-${r.skip + r.limit}/${count}`);

        res.status(206).json(products);
    })
};

function sanitizeProduct(product) {
    product = _.pickBy({
        name: (product.name = product.name.trim()) ? sanitize(product.name) : null,
        cost: _.isNumber(product.cost) ? sanitize(product.cost) : null,
        description: (product.description = product.description.trim()) ? sanitize(product.description) : null,
        image: product.image && (product.image = product.image.trim()) ? sanitize(product.image) : null
    });
    return product;
}
