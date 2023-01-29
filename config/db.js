const mysql = require("mysql");
const db    = mysql.createConnection({
  host    : process.env.DB_HOST,
  user    : process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port    : process.env.DB_PORT,
  dialect : process.env.DB_CONNECTION,
  pool    : {
    max     : 5,
    min     : 0,
    acquire : 30000,
    idle    : 10000
  }
});

db.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + db.threadId);
});
// db.end()

module.exports = db;
