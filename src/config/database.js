const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'tola.synology.me',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'mysqlpw',
  database: process.env.DB_NAME || 'db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool; 