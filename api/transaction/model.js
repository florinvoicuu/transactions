'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var _        = require('lodash');

var TransactionSchema = new Schema({
    sender: {
        type: Schema.ObjectId,
        ref: 'User',
        required: "Transaction requires a user (id)"
    },
    recipient: {
        type: Schema.ObjectId,
        ref: 'User',
        required: "Transaction requires a user (id)"
    },
    name: {
        type: String,
        required: "Transaction requires a name."
    },
    sum: {
        type:  Number,
        required: "Transaction requires a sum."
    },
    description: {
        type: String,
        required: "Transaction requires a description."
    }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

module.exports = mongoose.model('Transaction', TransactionSchema);
