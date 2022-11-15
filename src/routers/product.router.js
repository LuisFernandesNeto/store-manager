const express = require('express');
const productController = require('../controllers/productsControllers');

const router = express.Router();

router.get('/', productController.findAll);

router.get('/:id', productController.findByid);

router.post('/', productController.insertProduct);

module.exports = router;