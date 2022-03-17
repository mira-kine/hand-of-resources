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
  })
  .get('/:id', async (req, res) => {
    const song = await { id: '1', name: 'Eventually', artist: 'Tame Impala' };
    res.send(song);
  });
