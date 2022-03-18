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
      const books = await [
        {
          id: '1',
          name: 'Crying in H Mart',
          author: 'Michelle Zauner',
        },
        { id: '2', name: 'Six of Crows', author: 'Leigh Bardugo' },
      ];
      res.send(books);
    } catch (error) {
      next(error);
    }
  });
