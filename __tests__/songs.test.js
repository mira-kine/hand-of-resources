const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Songs = require('../lib/models/Songs');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should get all songs', async () => {
    await Songs.createSong({
      name: 'Eventually',
      artist: 'Tame Impala',
    });
    await Songs.createSong({
      name: 'Lucky',
      artist: 'Britney Spears',
    });
    const res = await request(app).get('/api/v1/songs');
    expect(res.body).toEqual([
      {
        id: expect.any(String),
        name: 'Eventually',
        artist: 'Tame Impala',
      },
      {
        id: expect.any(String),
        name: 'Lucky',
        artist: 'Britney Spears',
      },
    ]);
  });

  it('should get song by id', async () => {
    const song = await Songs.createSong({
      name: 'Eventually',
      artist: 'Tame Impala',
    });
    const expected = await Songs.getSongById(1);
    const res = await request(app).get(`/api/v1/songs/${song.id}`);
    expect(res.body).toEqual({ ...expected });
  });

  it('should update song by id', async () => {
    await Songs.createSong({
      name: 'Eventually',
      artist: 'Tame Impala',
    });
    const expected = await Songs.updateSongbyId(1, { name: 'Borderline' });
    const res = await request(app)
      .patch('/api/v1/songs/1')
      .send({ name: 'Borderline' });
    expect(res.body).toEqual({ ...expected });
  });

  it('should delete song by id', async () => {
    const song = await Songs.createSong({
      name: 'Eventually',
      artist: 'Tame Impala',
    });
    const res = await request(app).delete(`/api/v1/deepsea/${song.id}`);
    expect(res.body).toEqual(song);
  });
});
