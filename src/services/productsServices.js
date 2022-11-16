const index = require('../models');
const schema = require('./validations/validationsInputValues')

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

const insertProduct = async (name) => {
  const validateResult = schema.validatePostProductSchema(
    {name},
  );

  if (validateResult.type) return validateResult;

  const product = await productModel.insertProduct({name});
  const result = await productModel.findById(product);
  return { type: null, message: result };
};

module.exports = {
    findAll,
    findById,
    insertProduct,
};