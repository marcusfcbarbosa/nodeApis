'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'nome é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'e-mail é obrigatório'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'senha é obrigatório']
    }
});

module.exports = mongoose.model('Customer', schema);