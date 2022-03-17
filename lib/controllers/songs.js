const { Router } = require('express');
const Songs = require('../models/Songs');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const song = await Songs.createSong({
        name: req.body.name,
        artist: req.body.artist,
      });
      res.send(song);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const songs = await Songs.getAllSongs();
      res.send(songs);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const song = await Songs.getSongById(req.params.id);
      res.send(song);
    } catch (error) {
      next(error);
    }
  });
