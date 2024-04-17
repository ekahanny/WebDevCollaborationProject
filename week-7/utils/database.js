const mysql = require("mysql");

// konfigurasi database sql
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist",
});
con.connect();

function kueri(command) {
  return new Promise((resolve, reject) => {
    con.query(command, (err, result, fields) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

module.exports = kueri;
