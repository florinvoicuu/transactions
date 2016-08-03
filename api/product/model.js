'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var _        = require('lodash');

var ProductSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: "Product requires a user (id)"
    },
    name: {
        type: String,
        required: "Product requires a name."
    },
    cost: {
        type:  Number,
        required: "Product requires a cost."
    },
    description: {
        type: String,
        required: "Product requires a description."
    },
    image: {
        type: String,
        required: "Product requires an image."
    }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

module.exports = mongoose.model('Product', ProductSchema);
