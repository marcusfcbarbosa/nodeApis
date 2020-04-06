'use strict'

//Importação de módulos no node
const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();

//const port = 3000;
const port = normalizedPort(process.env.port || '3000');
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

//falando para o servidor ficar ouvindo a porta 3000
server.listen(port);

console.log("API rodando na porta : "+port);

//Normalizando a porta para escutar

function normalizedPort(val){

    const port = parseInt(val,10);

    if(isNaN(port)){
        return val;
    }

    if(port >=0){
        return port;
    }
    return false;
}