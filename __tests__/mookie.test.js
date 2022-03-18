const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Mookie = require('../lib/models/Mookie');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates an instance of mookie', async () => {
    const expected = {
      fav_toy: 'Octopus',
      num_treats: 2,
    };
    const res = await request(app).post('/api/v1/mookie').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets all mookie objects', async () => {
    const mookie1 = await Mookie.createMookie({
      fav_toy: 'Octopus',
      num_treats: 2,
    });
    const mookie2 = await Mookie.createMookie({
      fav_toy: 'Bone',
      num_treats: 5,
    });
    const res = await request(app).get('/api/v1/mookie');
    expect(res.body).toEqual(expect.arrayContaining([mookie1, mookie2]));
  });
});
