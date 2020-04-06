'use strict'
const express = require('express');
const app = express();
const router = express.Router();
//criando a primeira rota
const route = router.get('/',(req,res,next)=>{
    res.status(200).send({
        title:"Node Store API",
        version: "0.01"
    });
});

app.use('/',route);

//exportando a aplicação
module.exports = app;
