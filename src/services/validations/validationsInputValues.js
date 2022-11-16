const schema = require('./schema');

const { addProductSchema } = schema;

const validatePostProductSchema = (productName) => {
    const { error } = addProductSchema
    .validate(productName);
    if (error) return { type: 'INVALID_VALUE', message: error.message };
    return { type: null, message: '' };
};

module.exports = {
    validatePostProductSchema,
}