'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/order-repository');
const guid = require('guid');

exports.post = async (req, res, next) => {
    try {
        let data = {
            customer: req.body.customer,
            number: guid.raw().substring(0,6),
            items:req.body.items
        };

        await repository.createAsync(data);
        res.status(201).send({ message: 'Pedido cadastrado com sucesso' });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição' + e.message
        });
    }
};

exports.get = async (req, res, next) => {
    try {
        var data = await repository.getAsync();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        });
    }
};