const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('../routes/bookRoutes');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(bodyParser.json());
app.use('/', bookRoutes);

describe('Book Controller', () => {
  beforeAll(async () => {
    await prisma.books.deleteMany(); // Bersihkan data sebelum tes
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new book', async () => {
    const res = await request(app)
      .post('/books')
      .send({ title: 'Test Book', author: 'Test Author', year: 2021 });
    expect(res.statusCode).toEqual(201);
    expect(res.text).toBe('Buku berhasil ditambahkan.');
  });

  it('should get all books', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a book by ID', async () => {
    const book = await prisma.books.create({
      data: { title: 'Another Test Book', author: 'Test Author', year: 2021 },
    });
    const res = await request(app).get(`/books/${book.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Another Test Book');
  });

  it('should update a book by ID', async () => {
    const book = await prisma.books.create({
      data: { title: 'Update Test Book', author: 'Test Author', year: 2021 },
    });
    const res = await request(app)
      .put(`/books/${book.id}`)
      .send({ title: 'Updated Book', author: 'Updated Author', year: 2022 });
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Buku berhasil diperbarui.');
  });

  it('should delete a book by ID', async () => {
    const book = await prisma.books.create({
      data: { title: 'Delete Test Book', author: 'Test Author', year: 2021 },
    });
    const res = await request(app).delete(`/books/${book.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Buku berhasil dihapus.');
  });
});
