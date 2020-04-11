'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product.find({ active: true }, 'title price slug tags');
}

exports.getBySlug = (slug) => {
    return Product.findOne(
        {
            slug: slug,
            active: true
        }
        , 'title price price slug tags');
}

exports.getById = (id) => {
    return Product.findById(id);
}

exports.getByTag = (tag) => {
    return Product.find(
        {
            tags: tag
        }
        , 'title price price slug tags'
    );
}

exports.create = (data) => {
    var product = new Product(data);
    return product.save();
}

exports.update = (id, data) => {
    return Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    });
}

exports.delete = (id) => {
    return Product.findByIdAndRemove(id);
}

//async methods
exports.getAsync = async () => {
    const res = await Product.find({
        active: true
    }, 'title price slug');
    return res;
}

exports.getBySlugAsync = async (slug) => {
    const res = await Product.findOne(
        {
            slug: slug,
            active: true
        }
        , 'title price price slug tags');
    return res;
}

exports.getByIdAsync = async (id) => {
    const res = await Product.findById(id);
    return res;
}

exports.getByTagAsync = async (tag) => {
    const res = await Product.find(
        {
            tags: tag
        }
        , 'title price price slug tags'
    );
    return res;
}

exports.createAsync = async (data) => {
    var product = new Product(data);
    await product.save();
}

exports.updateAsync = async (id, data) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    });
}

exports.deleteAsync = async (id) => {
    await Product.findByIdAndRemove(id);
}