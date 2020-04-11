'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

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
// exports.get = (req, res, next) => {
//     repository.
//         get()
//         .then(data => {
//             res.status(201).send(data);
//         }
//         ).catch(e => {
//             res.status(400).send({
//                 message: 'Falha',
//                 data: e
//             });
//         });
// };

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlugAsync(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        });
    }
};

// exports.getBySlug = (req, res, next) => {
//     repository.
//         getBySlug(req.params.slug)
//         .then(data => {
//             res.status(201).send(data);
//         }
//         ).catch(e => {
//             res.status(400).send({
//                 message: 'Falha',
//                 data: e
//             });
//         });
// };

exports.getById = async(req, res, next) => {
    try{
        var data = await repository.getByIdAsync(req.params.id);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        });
    }
};

// exports.getById = (req, res, next) => {
//     repository.getById(req.params.id)
//         .then(data => {
//             res.status(201).send(data);
//         }
//         ).catch(e => {
//             res.status(400).send({
//                 message: 'Falha',
//                 data: e
//             });
//         });
// };


exports.getByTag = async(req, res, next) => {
    try{
        var data = await repository.getByTagAsync(req.params.tag);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        });
    }
};

// exports.getByTag = (req, res, next) => {
//     repository.getByTag(req.params.tag)
//         .then(data => {
//             res.status(201).send(data);
//         }
//         ).catch(e => {
//             res.status(400).send({
//                 message: 'Falha',
//                 data: e
//             });
//         });
// };


exports.post =  async(req, res, next) => {
    try{
        let contract = new ValidationContract();
        contract.hasMinLen(req.body.title, 3, 'O titulo deve ter pelo menos 3 caracteres');
        contract.hasMinLen(req.body.slug, 3, 'O slug deve ter pelo menos 3 caracteres');
        contract.hasMinLen(req.body.description, 3, 'A descrição deve ter pelo menos 3 caracteres');
        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).send();
            return;
        }
        await repository.createAsync(req.body);
        res.status(201).send({ message: 'Produto cadastrado com sucesso' });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar a requisição'+e.message
        });
    }
};
// exports.post = (req, res, next) => {
//     let contract = new ValidationContract();
//     contract.hasMinLen(req.body.title, 3, 'O titulo deve ter pelo menos 3 caracteres');
//     contract.hasMinLen(req.body.slug, 3, 'O slug deve ter pelo menos 3 caracteres');
//     contract.hasMinLen(req.body.description, 3, 'A descrição deve ter pelo menos 3 caracteres');
//     if (!contract.isValid()) {
//         res.status(400).send(contract.errors()).send();
//         return;
//     }
//     repository.create(req.body)
//         .then(x => {
//             res.status(201).send({ message: 'Produto cadastrado com sucesso' });
//         }).catch(e => {
//             res.status(400).send({
//                 message: 'Falha',
//                 data: e
//             });
//         });
// };


exports.put = async (req, res, next) => {
    try{
        await repository.updateAsync(req.params.id, req.body);
        res.status(201).send({ message: 'Produto atualizado com sucesso!!' });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar a requisição'+e.message
        });
    }
};

// exports.put = (req, res, next) => {
//     repository.update(req.params.id, req.body)
//         .then(data => {
//             res.status(201).send({ message: 'Produto Atualizado com sucesso!' });
//         }).catch(e => {
//             res.status(400).send({
//                 message: 'Falha',
//                 data: e
//             });
//         });
// };



exports.delete = async (req, res, next) => {
    try{
         await repository.deleteAsync(req.params.id);
         res.status(201).send({ message: 'Produto removido com sucesso!!' });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar a requisição'+e.message
        });
    }
};


// exports.delete = (req, res, next) => {
//     repository.delete(req.params.id)
//         .then(data => {
//             res.status(201).send({ message: 'Produto Removido com sucesso!' });
//         }).catch(e => {
//             res.status(400).send({
//                 message: 'Falha',
//                 data: e
//             });
//         });
// };


