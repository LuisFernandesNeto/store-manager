const salesServices = require('../services/salesServices');

const insert = async (req, res) => {
    const { productId, quantity } = req.body;
    const { type, message } = await salesServices.insert(productId, quantity);
    if (type === 'INVALID_PRODUCT_ID') {
        return res.status(400).json({ message });
    }
    if (type === 'INVALID_QUANTITY') {
        return res.status(400).json({ message });
    }
    if (type === 'ERROR_QUANTITY') {
        return res.status(422).json({ message });
    }
    if (type === 'ERROR_PRODUCT_ID') {
        return res.status(404).json({ message });
    }
    return res.status(201).json(message);
};

module.exports = {
    insert,
}