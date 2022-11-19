const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: 'root',
  password: 'password',
  database: 'StoreManager',
  waitForConnections: 'true',
  connectionLimit: '10',
  queueLimit: '0',
});

module.exports = connection;