const { Router } = require('express');
const Songs = require('../models/Songs');

module.exports = Router()
  .post('/', async (req, res) => {
    const song = await Songs.createSong({
      id: '1',
      name: req.body.name,
      artist: req.body.artist,
    });
    res.send(song);
  })
  .get('/', async (req, res) => {
    const songs = await [
      { id: '1', name: 'Eventually', artist: 'Tame Impala' },
      {
        id: '2',
        name: 'Lucky',
        artist: 'Britney Spears',
      },
    ];
    res.send(songs);
  });
