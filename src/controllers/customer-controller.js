'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');


exports.post = async (req, res, next) => {
    try {
        let contract = new ValidationContract();
        contract.hasMinLen(req.body.name, 3, 'O Nome deve ter pelo menos 3 caracteres');
        contract.isEmail(req.body.email, 'E-mail inválido');
        contract.hasMinLen(req.body.password, 3, 'A senha deve possuir pelo menos 3 caracteres');
        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).send();
            return;
        }
        await repository.createAsync({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles:req.body.roles
        });
        emailService.send(req.body.email, 'Bem vindo ao NodeStore', global.EMAIL_TMPL.replace('{0}', req.body.name));
        res.status(201).send({ message: 'Cliente cadastrado com sucesso' });
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

exports.delete = async (req, res, next) => {
    try {
        await repository.deleteAsync(req.params.id);
        res.status(201).send({ message: 'Cliente removido com sucesso!!' });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição' + e.message
        });
    }
};

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(401).send({
                message: 'Usuario ou senha inválidos'
            });
            return;
        }
        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });
        res.status(201).send({
            token: token,
            data: {
                email: req.body.email,
                name: req.body.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição' + e.message
        });
    }
};


exports.refreshToken = async (req, res, next) => {
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //recuperando dados do usuario logado
        const data = await authService.decodeToken(token);
        const customer = await repository.getById(data.id);
        if (!customer) {
            res.status(401).send({
                message: 'Cliente não encontrado'
            });
            return;
        }
    
        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name
        });
        res.status(201).send({
            token: tokenData,
            data: {
                email: req.body.email,
                name: req.body.name
            }
        });

    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar a requisição' + e.message
        });
    }
    

    
};