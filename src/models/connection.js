const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: 'root',
  password: 'password',
  database: 'StoreManager',
  waitForConnections: 'true',
  connectionLimit: '10',
  queueLimit: '0',
});

module.exports = connection;