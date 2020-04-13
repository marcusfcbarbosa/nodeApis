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