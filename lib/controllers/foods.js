const { Router } = require('express');
const Foods = require('../models/Foods');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const food = await Foods.createFood({
      name: req.body.name,
      cost: req.body.cost,
    });
    res.send(food);
  } catch (error) {
    next(error);
  }
});
