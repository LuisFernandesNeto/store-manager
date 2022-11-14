const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const getProductSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    name: Joi.string().min(3).required(),
});

module.exports = {
  idSchema,
  getProductSchema,
};