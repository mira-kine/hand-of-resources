const { Router } = require('express');
const Animes = require('../models/Animes');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const anime = await Animes.createAnime({
      name: req.body.name,
      favorite_character: req.body.favorite_character,
      year: req.body.year,
    });
    res.json(anime);
  } catch (error) {
    next(error);
  }
});
