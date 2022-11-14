const productServices = require('../services/productsServices');

const findAll = async (_req, res) => {
    try {
        const result = await productServices.findAll();
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ message: err.sqlMessage });
    }   
};

const findByid = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, message } = await productServices.findById(id);
        if (type) {
          return res.status(404).json({ message });
        }
          return res.status(200).json(message);
    } catch (err) {
        return res.status(500).json({ message: err.sqlMessage });
    }
};

module.exports = {
  findAll,
  findByid,
};