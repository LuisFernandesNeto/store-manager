const salesModels = require('../../models/salesModels');
const schema = require('./schema');

const { addProductSchema, addSalesSchema } = schema;

const validatePostProductSchema = (productName) => {
    const { error } = addProductSchema
    .validate(productName);
     if (error) {
        /* console.log(error.details[0].message);
        return { type: 'INVALID_VALUE', message: error.details[0].message }; */
        if (error.details[0].message === '"name" is required') {
            return { type: 'INVALID_VALUE', message: '"name" is required' };
        }
        return { type: 'INVALID_NAME',
         message: '"name" length must be at least 5 characters long' };
     }
    return { type: null, message: '' };
};

const validateQuantity = (quantity) => {
    const { error } = addSalesSchema
    .validate(quantity);
    if (error) {
        return { type: 'INVALID_QUANTITY',
         message: '"quantity" must be greater than or equal to 1' };
    }
    return { type: null, message: '' };
};

const validateId = async (id) => {
    const { error } = schema.idSchema
    .validate(id);
    if (error) {
        return { type: 'INVALID_PRODUCT_ID', message: 'Product not found' };
    }

    const searchId = await salesModels.findById(id);
    if (searchId) return { type: null, message: '' };

    return { type: 'ERROR_PRODUCT_ID', message: 'Product not found' };
};

module.exports = {
    validatePostProductSchema,
    validateQuantity,
    validateId,
};