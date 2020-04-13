'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);

router.delete('/:id', authService.authorize, controller.delete);
router.get('/', authService.authorize, controller.get);

// router.get('/:slug',controller.getBySlug);
// router.get('/admin/:id',controller.getById);
// router.get('/tags/:tag',controller.getByTag);
// router.put('/:id',controller.put);

module.exports = router;