'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');


exports.getAsync = async () => {
    const res = await Order.find({},'number status').populate('customer','name').populate('items.product','title');
    return res;
}

exports.createAsync = async (data) => {
    var order = new Order(data);
    await order.save();
}