'use strict'

//Importação de módulos no node
const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();
const port = 3000;
app.set('port',port);

//criar o servidor

const server = http.createServer(app);//criando um modelo MVC
const router = express.Router();

//criando a primeira rota
const route = router.get('/',(req,res,next)=>{
    res.status(200).send({
        title:"Node Store API",
        version: "0.01"
    });
});

app.use('/',route);

