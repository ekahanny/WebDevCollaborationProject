// routes/bookRoutes.js

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Rute untuk mendapatkan semua buku
router.get('/books', bookController.getAllBooks);

// Rute untuk membuat buku baru
router.post('/books', bookController.createBook);

// Rute untuk mendapatkan buku berdasarkan ID
router.get('/books/:id', bookController.getBookById);

// Rute untuk mengupdate buku berdasarkan ID
router.put('/books/:id', bookController.updateBook);

// Rute untuk menghapus buku berdasarkan ID
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
