'use strict'
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const router = express.Router();

//criando a primeira rota
const route = router.get('/',(req,res,next)=>{
    res.status(200).send({
        title:"Node Store API",
        version: "0.01"
    });
});

//rota de criação
const create = router.post('/',(req,res,next)=> {
    res.status(201).send(req.body);
});

//rota de edição
const put = router.put('/:id',(req,res,next)=> {
    const id = req.params.id;
    res.status(201).send({
        id:id,
        item:req.body
    });
});

const _delete = router.delete('/:id',(req,res,next)=> {
    const id = req.params.id;
    res.status(201).send({
        id:id,
        item:req.body
    });
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use('/',route);
app.use('/products',create);
app.use('/products',put);


//exportando a aplicação
module.exports = app;
