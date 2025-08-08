// hash-fix.js
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jncpg@2024", // your MySQL password
  database: "snitch_store",
});

db.connect();

db.query("SELECT UID, PasswordHash FROM users", async (err, results) => {
  if (err) throw err;

  for (let user of results) {
    const password = user.PasswordHash;

    // Check if it's not already hashed
    if (!password.startsWith("$2b$")) {
      const hashed = await bcrypt.hash(password, 10);
      db.query(
        "UPDATE users SET PasswordHash = ? WHERE UID = ?",
        [hashed, user.UID],
        (err) => {
          if (err) console.log("Update error for UID:", user.UID);
          else console.log(`✅ Updated UID ${user.UID} with hashed password`);
        }
      );
    }
  }
});
