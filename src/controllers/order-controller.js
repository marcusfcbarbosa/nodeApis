'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-service');


exports.post = async (req, res, next) => {
    try {
        
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //recuperando dados do usuario logado
        const customerData = await authService.decodeToken(token);
        let data = {
            customer: customerData.id,
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