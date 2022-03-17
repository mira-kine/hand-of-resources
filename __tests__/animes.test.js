const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it.only('should create anime', async () => {
    const expected = {
      name: 'Naruto',
      favorite_character: 'Sasuke',
      year: '2002',
    };
    const res = await request(app).post('/api/v1/animes').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  //   it('should get all the anime', async () => {
  //     const anime1 = await {
  //       name: 'Naruto',
  //       favorite_character: 'Sasuke',
  //       year: 2002,
  //     };
  //     const anime2 = await {
  //       name: 'One Piece',
  //       favorite_character: 'Chopper',
  //       year: 1999,
  //     };
  //   });
  //     const res = await request(app).
});
