const { Router } = require('express');
const Songs = require('../models/Songs');

module.exports = Router()
  .post('/', async (req, res) => {
    const song = await Songs.createSong({
      name: req.body.name,
      artist: req.body.artist,
    });
    res.send(song);
  })
  .get('/', async (req, res) => {
    const songs = await Songs.getAllSongs();
    res.send(songs);
  });
