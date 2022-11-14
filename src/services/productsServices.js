const index = require('../models');

const { productModel } = index;

const findAll = async () => {
  const result = await productModel.findAll();
  return result;
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
    findAll,
    findById,
};