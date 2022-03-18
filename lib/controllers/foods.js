const { Router } = require('express');
const Foods = require('../models/Foods');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const food = await Foods.createFood({
        name: req.body.name,
        cost: req.body.cost,
      });
      res.send(food);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const food = await Foods.getAllFood();
      res.send(food);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const food = await Foods.getFoodById(req.params.id);
      res.send(food);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const food = await Foods.updateFoodById(req.params.id, req.body);
      res.send(food);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const food = await Foods.deleteFoodById(req.params.id);
      res.send(food);
    } catch (error) {
      next(error);
    }
  });
