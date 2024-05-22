// model/db.js

const mysql = require('mysql');

// Konfigurasi koneksi dengan database MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'book_management'
});

// Buat koneksi
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

// Export koneksi
module.exports = connection;
