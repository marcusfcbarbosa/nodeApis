'use strict'

const express = require('express');
const router = express.Router();

//rota de criação
router.post('/',(req,res,next)=> {
    res.status(201).send(req.body);
});

//rota de edição
router.put('/:id',(req,res,next)=> {
    const id = req.params.id;
    res.status(201).send({
        id:id,
        item:req.body
    });
});

 router.delete('/:id',(req,res,next)=> {
    const id = req.params.id;
    res.status(201).send({
        id:id,
        item:'delete'
    });
});


module.exports = router;