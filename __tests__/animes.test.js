const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Animes = require('../lib/models/Animes');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create anime', async () => {
    const expected = {
      name: 'Naruto',
      favorite_character: 'Sasuke',
      year: '2002',
    };
    const res = await request(app).post('/api/v1/animes').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('should get all the anime', async () => {
    const anime1 = await Animes.createAnime({
      name: 'Naruto',
      favorite_character: 'Sasuke',
      year: '2002',
    });
    const anime2 = await Animes.createAnime({
      name: 'One Piece',
      favorite_character: 'Chopper',
      year: '1999',
    });
    const res = await request(app).get('/api/v1/animes');
    expect(res.body).toEqual(expect.arrayContaining([anime1, anime2]));
  });

  it('should get anime by id', async () => {
    const anime = await Animes.createAnime({
      name: 'Naruto',
      favorite_character: 'Sasuke',
      year: '2002',
    });
    const expected = await Animes.getAnimeById(anime.id);
    const res = await request(app).get(`/api/v1/animes/${anime.id}`);
    expect(res.body).toEqual({ ...expected });
  });

  it('should update anime by id', async () => {
    await Animes.createAnime({
      name: 'Naruto',
      favorite_character: 'Sasuke',
      year: '2002',
    });
    const expected = await Animes.updateAnimeById({
      id: expect.any(String),
      favorite_character: 'Naruto',
    });
    const res = await request(app)
      .patch('/api/v1/animes/1')
      .send({ favorite_character: 'Naruto' });
    expect(res.body).toEqual({ ...expected });
  });

  it.only('should delete anime by id', async () => {
    const anime = await Animes.createAnime({
      name: 'Naruto',
      favorite_character: 'Sasuke',
      year: '2002',
    });
    const res = await request(app).delete(`/api/v1/animes/${anime.id}`);
    expect(res.body).toEqual(anime);
    expect(await Animes.getAnimeById(anime.id)).toBeNull();
  });
});
