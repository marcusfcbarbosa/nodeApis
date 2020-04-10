'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');

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

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title,3,'O titulo deve ter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slu,3,'O slug deve ter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description,3,'A descrição deve ter pelo menos 3 caracteres');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).send();
        return;
    }
    
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
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    }).then(data => {
        res.status(201).send({ message: 'Produto Atualizado com sucesso!' });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha',
            data: e
        });
    });
};

exports.delete = (req, res, next) => {
    Product.findByIdAndRemove(req.params.id).then(data => {
        res.status(201).send({ message: 'Produto Removido com sucesso!' });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha',
            data: e
        });
    });
};



