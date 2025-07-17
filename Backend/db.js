// backend/db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'swethar@2003',
  database: 'snitch_store',
});

module.exports = db;
