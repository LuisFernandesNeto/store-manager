const express = require('express');
const salesController = require('../controllers/salesControllers');
const validateSales = require('../middlewares/validateSales');

const router = express.Router();

router.post('/', validateSales, salesController.insert);

module.exports = router;