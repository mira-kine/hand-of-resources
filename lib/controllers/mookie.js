const { Router } = require('express');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const mookie = {
      id: '1',
      fav_toy: 'Octopus',
      num_treats: 2,
    };
    res.send(mookie);
  } catch (error) {
    next(error);
  }
});
