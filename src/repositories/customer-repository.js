'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.getAsync = async () => {
    const res = await Customer.find({
    }, 'name email password');
    return res;
}

exports.createAsync = async (data) => {
    var customer = new Customer(data);
    await customer.save();
}

exports.deleteAsync = async (id) => {
    await Customer.findByIdAndRemove(id);
}

exports.authenticate = async (data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getById = async (id) => {
    const res = await Customer.findById(id);

    return res;
}



