// controllers/bookController.js

const db = require('../models/db');

// Mendapatkan semua buku
exports.getAllBooks = (req, res) => {
  db.query('SELECT * FROM books', (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send('Terjadi kesalahan dalam mengambil data buku.');
      return;
    }
    if (rows.length === 0) {
      res.status(404).send('Tidak ada buku yang ditemukan.');
      return;
    }
    res.json(rows);
  });
};

// Membuat buku baru
exports.createBook = (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    res.status(400).send('Semua bidang (title, author, year) harus diisi.');
    return;
  }
  db.query('INSERT INTO books (title, author, year) VALUES (?, ?, ?)', [title, author, year], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Gagal membuat buku baru.');
      return;
    }
    res.status(201).send('Buku berhasil ditambahkan.');
  });
};

// Mendapatkan buku berdasarkan ID
exports.getBookById = (req, res) => {
  const bookId = req.params.id;
  db.query('SELECT * FROM books WHERE id = ?', [bookId], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send('Terjadi kesalahan dalam mengambil data buku.');
      return;
    }
    if (rows.length === 0) {
      res.status(404).send('Buku dengan id tersebut tidak ditemukan.');
      return;
    }
    res.json(rows[0]);
  });
};

// Mengupdate buku berdasarkan ID
exports.updateBook = (req, res) => {
  const bookId = req.params.id;
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    res.status(400).send('Semua bidang (title, author, year) harus diisi.');
    return;
  }
  db.query('UPDATE books SET title = ?, author = ?, year = ? WHERE id = ?', [title, author, year, bookId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Gagal memperbarui buku.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Buku tidak ditemukan.');
      return;
    }
    res.send('Buku berhasil diperbarui.');
  });
};

// Menghapus buku berdasarkan ID
exports.deleteBook = (req, res) => {
  const bookId = req.params.id;
  db.query('DELETE FROM books WHERE id = ?', [bookId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Gagal menghapus buku.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Buku tidak ditemukan.');
      return;
    }
    res.send('Buku berhasil dihapus.');
  });
};
