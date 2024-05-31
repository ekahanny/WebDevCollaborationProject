// controllers/bookController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all books.
 * Retrieves a list of all books from the database.
 * 
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves to a JSON response containing the list of books or an error message.
 */
exports.getAllBooks = async (req, res) => {
  try {
    const books = await prisma.books.findMany();
    if (books.length === 0) {
      res.status(404).send('Tidak ada buku yang ditemukan.');
      return;
    }
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).send('Terjadi kesalahan dalam mengambil data buku.');
  }
};

/**
 * Create a new book.
 * Adds a new book to the database with the given title, author, and year.
 * 
 * @param {object} req - Express request object.
 * @param {object} req.body - The data of the book to be created.
 * @param {string} req.body.title - The title of the book.
 * @param {string} req.body.author - The author of the book.
 * @param {number} req.body.year - The publication year of the book.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves to a success message or an error message.
 */
exports.createBook = async (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    res.status(400).send('Semua bidang (title, author, year) harus diisi.');
    return;
  }
  try {
    const newBook = await prisma.books.create({
      data: {
        title,
        author,
        year: parseInt(year),
      },
    });
    res.status(201).send('Buku berhasil ditambahkan.');
  } catch (error) {
    console.log(error);
    res.status(500).send('Gagal membuat buku baru.');
  }
};

/**
 * Get a book by ID.
 * Retrieves a book from the database based on its ID.
 * 
 * @param {object} req - Express request object.
 * @param {object} req.params - The parameters of the request.
 * @param {number} req.params.id - The ID of the book to retrieve.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves to a JSON response containing the book data or an error message.
 */
exports.getBookById = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await prisma.books.findUnique({
      where: { id: bookId },
    });
    if (!book) {
      res.status(404).send('Buku dengan id tersebut tidak ditemukan.');
      return;
    }
    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send('Terjadi kesalahan dalam mengambil data buku.');
  }
};

/**
 * Update a book by ID.
 * Updates the details of an existing book in the database based on its ID.
 * 
 * @param {object} req - Express request object.
 * @param {object} req.params - The parameters of the request.
 * @param {number} req.params.id - The ID of the book to update.
 * @param {object} req.body - The new data for the book.
 * @param {string} req.body.title - The new title of the book.
 * @param {string} req.body.author - The new author of the book.
 * @param {number} req.body.year - The new publication year of the book.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves to a success message or an error message.
 */
exports.updateBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    res.status(400).send('Semua bidang (title, author, year) harus diisi.');
    return;
  }
  try {
    const updatedBook = await prisma.books.update({
      where: { id: bookId },
      data: {
        title,
        author,
        year: parseInt(year),
      },
    });
    res.send('Buku berhasil diperbarui.');
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).send('Buku tidak ditemukan.');
    } else {
      console.log(error);
      res.status(500).send('Gagal memperbarui buku.');
    }
  }
};

/**
 * Delete a book by ID.
 * Removes a book from the database based on its ID.
 * 
 * @param {object} req - Express request object.
 * @param {object} req.params - The parameters of the request.
 * @param {number} req.params.id - The ID of the book to delete.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves to a success message or an error message.
 */
exports.deleteBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    await prisma.books.delete({
      where: { id: bookId },
    });
    res.send('Buku berhasil dihapus.');
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).send('Buku tidak ditemukan.');
    } else {
      console.log(error);
      res.status(500).send('Gagal menghapus buku.');
    }
  }
};
