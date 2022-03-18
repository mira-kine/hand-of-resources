const { Router } = require('express');
const Mookie = require('../models/Mookie');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const mookie = await Mookie.createMookie({
        fav_toy: req.body.fav_toy,
        num_treats: req.body.num_treats,
      });
      res.send(mookie);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const mookies = [
        { id: '1', fav_toy: 'Octopus', num_treats: 2 },
        { id: '2', fav_toy: 'Bone', num_treats: 5 },
      ];
      res.send(mookies);
    } catch (error) {
      next(error);
    }
  });
