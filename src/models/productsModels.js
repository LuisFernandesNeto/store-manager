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

const insert = async ({ name }) => {
  const [{ insertId }] = await connection
  .execute('INSERT INTO StoreManager.products (name) VALUE (?)', [name]);
  return insertId;
};

const update = async (name, id) => {
  const product = await connection.execute(`
  UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?
  `, [name, id]);
  return camelize(product);
};

module.exports = {
    findAll,
    findById,
    insert,
    update,
};