'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');


exports.post =  async(req, res, next) => {
    try{
        let contract = new ValidationContract();
        contract.hasMinLen(req.body.name, 3, 'O Nome deve ter pelo menos 3 caracteres');
        contract.isEmail(req.body.email,'E-mail inválido');
        contract.hasMinLen(req.body.password, 3, 'A senha deve possuir pelo menos 3 caracteres');
        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).send();
            return;
        }
        await repository.createAsync({
            name:req.body.name,
            email:req.body.email,
            password:md5(req.body.password + global.SALT_KEY)
        });

        emailService.send(req.body.email,'Bem vindo ao NodeStore',global.EMAIL_TMPL.replace('{0}',req.body.name));

        res.status(201).send({ message: 'Cliente cadastrado com sucesso' });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar a requisição'+e.message
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