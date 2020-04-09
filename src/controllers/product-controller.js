'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
    Product.find({ active: true }, 'title price slug tags'
    ).then(data => {
        res.status(201).send(data);
    }
    ).catch(e => {
        res.status(400).send({
            message: 'Falha',
            data: e
        });
    });
};

exports.getById = (req, res, next) => {
    Product.findById(req.params.id).then(data => {
        res.status(201).send(data);
    }
    ).catch(e => {
        res.status(400).send({
            message: 'Falha',
            data: e
        });
    });
};

exports.getByTag = (req, res, next) => {
    Product.find(
        {
            tags: req.params.tag
        }
        , 'title price price slug tags'
    ).then(data => {
        res.status(201).send(data);
    }
    ).catch(e => {
        res.status(400).send({
            message: 'Falha',
            data: e
        });
    });
};

exports.getBySlug = (req, res, next) => {
    Product.findOne(
        {
            slug: req.params.slug,
            active: true
        }
        , 'title price price slug tags'
    ).then(data => {
        res.status(201).send(data);
    }
    ).catch(e => {
        res.status(400).send({
            message: 'Falha',
            data: e
        });
    });
};


exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product.
        save()
        .then(x => {
            res.status(201).send({ message: 'Produto cadastrado com sucesso' });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha',
                data: e
            });
        });
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: 'delete'
    });
};

