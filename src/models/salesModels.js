const snakeize = require('snakeize');
const camelize = require('camelize');
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

  const findAll = async () => {
    const [response] = await connection
    .execute(`
  SELECT 
    sp.sale_id, 
    s.date, sp.product_id, 
    sp.quantity 
  FROM 
    sales s 
  INNER JOIN 
    sales_products sp 
  ON 
    s.id = sp.sale_id`);
    return camelize(response);
  };

  const findSaleById = async (id) => {
    const [sale] = await connection
    .execute(`
  SELECT
    s.date,
    sp.product_id,
    sp.quantity
  FROM
    sales s
    INNER JOIN sales_products sp ON s.id = sp.sale_id
  WHERE
    id = ?
  `,
   [id]);
    return camelize(sale);
  };

module.exports = {
    findById,
    insert,
    insertSale,
    findAll,
    findSaleById,
};