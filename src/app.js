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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',route);
app.use('/products',create);


//exportando a aplicação
module.exports = app;
