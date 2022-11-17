const index = require('../models');
const schema = require('./validations/validationsInputValues');

const { salesModel } = index;

const insert = async (array) => {
    const quantities = array.map((a) => a.quantity);

    const validateQuantities = quantities.map((quantity) => schema.validateQuantity(quantity));

    const findError = validateQuantities.find((error) => error.type === 'INVALID_QUANTITY');

    if (findError) return findError;

    const ids = array.map((a) => a.productId);

    const validateIds = await Promise.all(ids.map(async (id) => schema.validateId(id)));

    const findErrorId = validateIds.find((error) => error.type === 'ERROR_PRODUCT_ID');

    if (findErrorId) return findErrorId;

    const sale = await salesModel.insertSale();

    await Promise.all(array.map(async (values) => salesModel.insert(values, sale)));

    const result = { 
        id: sale,
        itemsSold: array,
    };

    return { type: null, message: result };
};

module.exports = {
    insert,
};