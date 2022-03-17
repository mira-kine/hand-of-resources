const { Router } = require('express');

module.exports = Router().post('/', async (req, res) => {
  const song = await { id: '1', name: 'Eventually', artist: 'Tame Impala' };
  res.send(song);
});
