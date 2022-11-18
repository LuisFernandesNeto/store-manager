const express = require('express');
const salesController = require('../controllers/salesControllers');
const validateSales = require('../middlewares/validateSales');

const router = express.Router();

router.post('/', validateSales, salesController.insert);

router.get('/', salesController.findAll);

router.get('/:id', salesController.findById);

module.exports = router;