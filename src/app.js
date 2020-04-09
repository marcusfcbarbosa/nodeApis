'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//criando a conexao com banco online
mongoose.connect('mongodb+srv://marcusfcb:mfcb4625@cluster0-8nqe9.azure.mongodb.net/test?retryWrites=true&w=majority');

//Carregando os models
const Product = require('./models/product');

//carregar as rotas
const index = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));


app.use('/',index);
app.use('/products',productRoute);


//exportando a aplicação
module.exports = app;
