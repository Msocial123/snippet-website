// backend/db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Jncpg@2024',
  database: 'snitch_store',
});

module.exports = db;
