// Import library yang diperlukan
const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');

// Inisialisasi aplikasi Express
const app = express();

// Middleware untuk parsing body JSON
app.use(bodyParser.json());

// Port yang akan digunakan
const PORT = process.env.PORT || 3000;

// Route default
app.get('/', (req, res) => {
  res.send('Selamat datang di API Manajemen Buku!');
});

app.use('/', bookRoutes);

// Mulai server
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
