'use strict'

const express = require('express');
const router = express.Router();

//Rota padrão
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.01"
    });
});

module.exports = router;