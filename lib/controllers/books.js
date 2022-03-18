const { Router } = require('express');
const { updateBookById } = require('../models/Books');
const Books = require('../models/Books');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const book = await Books.createBook({
        name: req.body.name,
        author: req.body.author,
      });
      res.send(book);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const books = await Books.getAllBooks();
      res.send(books);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const book = await Books.getBookById(req.params.id);
      res.send(book);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const book = await Books.updateBookById(req.params.id, req.body);
      res.send(book);
    } catch (error) {
      next(error);
    }
  });
