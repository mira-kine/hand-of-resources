const { Router } = require('express');
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
  });
