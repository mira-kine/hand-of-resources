const { Router } = require('express');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const book = await {
      id: '1',
      name: 'Crying in H Mart',
      author: 'Michelle Zauner',
    };
    res.send(book);
  } catch (error) {
    next(error);
  }
});
