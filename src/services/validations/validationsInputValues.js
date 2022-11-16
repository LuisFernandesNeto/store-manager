const schema = require('./schema');

const { addProductSchema } = schema;

const validatePostProductSchema = (productName) => {
    const { error } = addProductSchema
    .validate(productName);
    /* if (error) return { type: 'INVALID_VALUE', message: error.details[0].message };
    if (productName.length < 5) {
        return { type: 'INVALID_NAME',
         message: error.details[0].message };
     } */
     if (error) {
        if (error.details[0].message === '"name" is required') {
            return { type: 'INVALID_VALUE', message: '"name" is required' };
        }
        return { type: 'INVALID_NAME',
         message: '"name" length must be at least 5 characters long' };
     }
    return { type: null, message: '' };
};

module.exports = {
    validatePostProductSchema,
};