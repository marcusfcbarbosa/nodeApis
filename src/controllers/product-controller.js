'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');


exports.get = (req, res, next) => {
    repository.
        get()
        .then(data => {
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
    repository.
        getBySlug(req.params.slug)
        .then(data => {
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
    repository.getById(req.params.id)
    .then(data => {
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
    repository.getByTag(req.params.tag)
    .then(data => {
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
    contract.hasMinLen(req.body.title, 3, 'O titulo deve ter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve ter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve ter pelo menos 3 caracteres');
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).send();
        return;
    }
        repository.create(req.body)
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
    repository.update(req.params.id,req.body)
    .then(data => {
        res.status(201).send({ message: 'Produto Atualizado com sucesso!' });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha',
            data: e
        });
    });
};

exports.delete = (req, res, next) => {
    repository.delete(req.params.id)
    .then(data => {
        res.status(201).send({ message: 'Produto Removido com sucesso!' });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha',
            data: e
        });
    });
};