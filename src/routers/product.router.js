const express = require('express');
const productController = require('../controllers/productsControllers');
const validateProduct = require('../middlewares/validateProduct');

const router = express.Router();

router.get('/', productController.findAll);

router.get('/:id', productController.findById);

router.post('/', productController.insert);

router.put('/:id', validateProduct, productController.update);

router.delete('/:id', productController.remove);

module.exports = router;