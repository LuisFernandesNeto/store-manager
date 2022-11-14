const express = require('express');
const productController = require('../controllers/productsControllers');

const router = express.Router();

router.get('/', productController.findAll);

router.get('/:id', productController.findByid);

module.exports = router;