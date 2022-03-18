const { Router } = require('express');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const food = {
      id: '1',
      name: 'Katsu curry',
      cost: '500 yen',
    };
    res.send(food);
  } catch (error) {
    next(error);
  }
});
