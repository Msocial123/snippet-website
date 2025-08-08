// // Backend/db.js
// const mysql = require("mysql2/promise");

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "swethar@2003",
//   database: "snitch_store",
// });

// module.exports = db;


// db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',

  password: 'swethar@2003', // ✅ Set your DB password here
  database: 'snitch_store', // ✅ Replace with your DB name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0

});

module.exports = db;
