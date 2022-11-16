const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
return result;
};

const findById = async (id) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return camelize(product);
};

const insertProduct = async ({ name }) => {
  const [{ insertId }] = await connection
  .execute('INSERT INTO StoreManager.products (name) VALUE (?)', [name]);
  return insertId;
};

module.exports = {
    findAll,
    findById,
    insertProduct,
};