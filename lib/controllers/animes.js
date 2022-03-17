const { Router } = require('express');
const Animes = require('../models/Animes');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const anime = await Animes.createAnime({
        name: req.body.name,
        favorite_character: req.body.favorite_character,
        year: req.body.year,
      });
      res.send(anime);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const animes = await Animes.getAllAnime();
      res.send(animes);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const anime = await {
        id: '1',
        name: 'Naruto',
        favorite_character: 'Sasuke',
        year: '2002',
      };
      res.send(anime);
    } catch (error) {
      next(error);
    }
  });
