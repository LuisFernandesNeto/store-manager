const index = require('../models');
const schema = require('./validations/validationsInputValues')

const { productModel } = index;

const findAll = async () => {
  const result = await productModel.findAll();
  console.log(result);
  return result;
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const insertProduct = async (productId, productName) => {
  const validateResult = schema.validatePostProductSchema(
    productId,
    productName,
  );

  if (validateResult.type) return validateResult;

  const product = await productModel.insertProduct(productId);
  return product;

}

module.exports = {
    findAll,
    findById,
    insertProduct,
};