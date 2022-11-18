const index = require('../models');
const schema = require('./validations/validationsInputValues');

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

const insert = async (item) => {
  const validateResult = schema.validatePostProductSchema(
    { name: item },
  );

  if (validateResult.type) return validateResult;

  const product = await productModel.insert({ name: item });
  const result = await productModel.findById(product);
  return { type: null, message: result };
};

const update = async (name, id) => {
  const validateResult = schema.validatePostProductSchema({ name });

  if (validateResult.type) return validateResult;

  const validateId = await schema.validateId(id);

  if (validateId.type) return validateId;

  const product = await productModel.update(name, id);
  if (product) return { type: null, message: { id, name } };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};
 
module.exports = {
    findAll,
    findById,
    insert,
    update,
};