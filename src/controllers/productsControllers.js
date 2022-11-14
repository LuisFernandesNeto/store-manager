const productServices = require('../services/productsServices');

const findAll = async (_req, res) => {
    const result = await productServices.findAll();
    return res.status(200).json(result);
};

const findByid = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await productServices.findById(id);
    if (type) {
      return res.status(404).json({ message });
    }
      return res.status(200).json(message);
};

module.exports = {
  findAll,
  findByid,
};