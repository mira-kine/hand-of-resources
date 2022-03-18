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
    const song1 = await Songs.createSong({
      name: 'Eventually',
      artist: 'Tame Impala',
    });
    const song2 = await Songs.createSong({
      name: 'Lucky',
      artist: 'Britney Spears',
    });
    const res = await request(app).get('/api/v1/songs');
    expect(res.body).toEqual(expect.arrayContaining([song1, song2]));
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
    const song = await Songs.createSong({
      name: 'Eventually',
      artist: 'Tame Impala',
    });
    const expected = await Songs.updateSongbyId(1, { name: 'Borderline' });
    const res = await request(app)
      .patch(`/api/v1/songs/${song.id}`)
      .send({ name: 'Borderline' });
    expect(res.body).toEqual({ ...expected });
  });

  it('should delete song by id', async () => {
    const song = await Songs.createSong({
      name: 'Eventually',
      artist: 'Tame Impala',
    });
    const res = await request(app).delete(`/api/v1/songs/${song.id}`);
    expect(res.body).toEqual(song);

    expect(await Songs.getSongById(song.id)).toBeNull();
  });
});
