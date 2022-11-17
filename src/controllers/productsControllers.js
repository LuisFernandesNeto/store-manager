const productServices = require('../services/productsServices');

const findAll = async (_req, res) => {
    const result = await productServices.findAll();
    return res.status(200).json(result);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await productServices.findById(id);
    if (type) {
      return res.status(404).json({ message });
    }
      return res.status(200).json(message);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productServices.insert(name);
    if (type === 'INVALID_VALUE') {
      return res.status(400).json({ message });
    }
    if (type === 'INVALID_NAME') {
      return res.status(422).json({ message });
    }
      return res.status(201).json(message);
};

module.exports = {
  findAll,
  findById,
  insert,
};