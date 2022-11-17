const errorMap = {
    INVALID_QUANTITY: 422,
    INVALID_PRODUCT_ID: 422,
    ERROR_PRODUCT_ID: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
    errorMap,
    mapError,
};