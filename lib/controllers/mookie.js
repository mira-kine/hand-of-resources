const { Router } = require('express');
const { getAllMookie } = require('../models/Mookie');
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
      const mookies = await getAllMookie();
      res.send(mookies);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const mookie = await Mookie.getMookieById(req.params.id);
      res.send(mookie);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const mookie = await Mookie.updateMookieById(req.params.id, req.body);
      res.send(mookie);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const mookie = await Mookie.deleteMookieById(req.params.id);
      res.send(mookie);
    } catch (error) {
      next(error);
    }
  });
