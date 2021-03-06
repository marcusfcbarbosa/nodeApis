'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

//criando a conexao com banco online
mongoose.connect(config.connectionString);

//Carregando os models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');


//rota padrao
const index = require('./routes/index-route');

//carregar as rotas
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');


app.use(bodyParser.json({
    limit: '5mb'
}));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With, Content-Type, Accept,x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT,OPTIONS');
    next();
});

app.use('/', index);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

//exportando a aplicação
module.exports = app;