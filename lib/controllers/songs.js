const { Router } = require('express');
const Songs = require('../models/Songs');

module.exports = Router().post('/', async (req, res) => {
  const song = await Songs.createSong({
    id: '1',
    name: req.body.name,
    artist: req.body.artist,
  });
  res.send(song);
});
