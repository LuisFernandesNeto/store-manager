const salesServices = require('../services/salesServices');
const errorMap = require('../utils/errorMap');

const insert = async (req, res) => {
    const array = req.body;
    const { type, message } = await salesServices.insert(array);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(201).json(message);
};

module.exports = {
    insert,
};