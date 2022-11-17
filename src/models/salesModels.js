const snakeize = require('snakeize');
const connection = require('./connection');

const findById = async (id) => {
    const [[product]] = await connection
    .execute('SELECT * FROM sales_products WHERE product_id = ?', [id]);
    return (product);
  };

  const insertSale = async () => {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales () VALUES ()',
    );
    return insertId;
  };
  
  const insert = async (product, saleId) => {
    const columns = Object.keys(snakeize(product))
      .map((key) => `${key}`)
      .join(', ');
  
    const placeholders = Object.keys(product)
      .map((_key) => '?')
      .join(', ');
  
    const [{ insertId }] = await connection.execute(
      `INSERT INTO StoreManager.sales_products (${columns}, sale_id) VALUES (${placeholders}, ?)`,
      [...Object.values(product), saleId],
    );
  
    return insertId;
  };

module.exports = {
    findById,
    insert,
    insertSale,
};