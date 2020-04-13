'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: [true, 'titulo é obrigatório'],
        trim: true
    },
    slug: {
        type: String,
        require: [true, 'slug é obrigatório'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'description é obrigatório'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'price é obrigatório'],
    },
    active: {
        type: Boolean,
        required: [true, 'active é obrigatório'],
        default: true
    },
    tags: [{
        type: String,
        required: [true, 'tags é obrigatório'],
    }],
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', schema);