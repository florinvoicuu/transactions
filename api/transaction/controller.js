'use strict';

var _        = require('lodash');
var sanitize = require('sanitize-html');

var co       = require('co');
var coe      = require('../../modules/co-express');
var range    = require('../../modules/range');

var Transaction   = require('./model');
var User    = require('../user/model');

module.exports = {

    /**
     * Creates a new Transaction in the DB.
     */

    create: (req, res, next) => {
        if (!req.user) {
            return res.status(401).send('Not authenticated');
        }

        Transaction.create({
            sender: req.user._id,
            recipient: req.user._id,
            name: req.body.name,
            sum: req.body.sum,
            description: req.body.description
        }, (err, transaction) => {
            if (err)
                return res.status(500).send(err);

            res.location(`/api/transaction/${transaction._id}`).status(201).json(transaction);
        });
    },

    /**
     * Get a single Transaction
     */
    retrieve: coe(function *(req, res) {
        if (!req.params.id) {
            return res.status(400).send('ID required');
        }

        let transaction = yield Transaction.findById(req.params.id, null, { lean: true });

        if (!transaction) {
            return res.status(404).end();
        }

        res.json(transaction);
    }),

    /**
     * Updates an existing Transaction in the DB.
     */
    update: coe(function *(req, res) {
        if (!req.params.id) {
            return res.status(400).send('ID required');
        }

        let transaction = yield Transaction.findByIdAndUpdate(req.params.id, { $set: sanitizeTransaction(req.body) }, { lean: true, new: true });

        res.json(transaction);
    }),

    /**
     * Delete an Transaction from the DB.
     */
    delete: coe(function *(req, res) {
        if (!req.params.id) {
            return res.status(400).send('ID required');
        }

        yield Transaction.findByIdAndRemove(req.params.id);

        res.status(204).end();
    }),

    /**
     * Get all the user's Transactions
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

        let transactions = yield Transaction.find(query, null, { lean: true, skip: r.skip, limit: r.limit, sort: '-created' });
        let count    = yield Transaction.count(query);

        res.set("Accept-Ranges", 'transactions');

        if (count && _.isEmpty(transactions)) {
            res.set("Content-Range", `transactions */${count}`);
            return res.status(416).end();
        }

        res.set("Content-Range", `transactions ${r.skip}-${r.skip + r.limit}/${count}`);

        res.status(206).json(transactions);
    })

};
function sanitizeTransaction(transaction) {
    transaction = _.pickBy({
        name: (transaction.name = transaction.name.trim()) ? sanitize(transaction.name) : null,
        sum: _.isNumber(transaction.sum) ? sanitize(transaction.sum) : null,
        description: (transaction.description = transaction.description.trim()) ? sanitize(transaction.description) : null
    });
    return transaction;
}
