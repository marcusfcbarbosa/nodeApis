'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');

//antes de enviar uma requisição deve estar autorizado
router.post('/',authService.authorizeAdmin,controller.post);//admin

router.get('/',authService.authorize,controller.get);
router.get('/:slug',authService.authorize,controller.getBySlug);
router.get('/admin/:id',authService.authorize,controller.getById);
router.get('/tags/:tag',authService.authorize,controller.getByTag);
router.put('/:id',authService.authorize,controller.put);

router.delete('/:id',authService.authorizeAdmin,controller.delete);//admin





module.exports = router;