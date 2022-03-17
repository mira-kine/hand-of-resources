const { Router } = require('express');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const anime = await {
      id: '1',
      name: 'Naruto',
      favorite_character: 'Sasuke',
      year: 2002,
    };
    res.json(anime);
  } catch (error) {
    next(error);
  }
});
