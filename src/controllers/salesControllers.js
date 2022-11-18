const salesServices = require('../services/salesServices');
const errorMap = require('../utils/errorMap');

const insert = async (req, res) => {
    const array = req.body;
    const { type, message } = await salesServices.insert(array);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(201).json(message);
};

const findAll = async (_req, res) => {
    const response = await salesServices.findAll();
    return res.status(200).json(response);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await salesServices.findById(id);
    if (type) {
        return res.status(404).json({ message });
    }
    return res.status(200).json(message);
};

module.exports = {
    insert,
    findAll,
    findById,
};