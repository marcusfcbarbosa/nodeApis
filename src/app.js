'use strict'
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

//criando a conexao com banco online
mongoose.connect('mongodb+srv://marcusfcb:mfcb4625@cluster0-8nqe9.azure.mongodb.net/test?retryWrites=true&w=majority');


const app = express();

//carregar as rotas
const index = require('./routes/index-route');
const product = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use('/',index);
app.use('/products',product);


//exportando a aplicação
module.exports = app;
