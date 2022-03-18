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
    const expected = await Mookie.getAllMookie();
    const res = await request(app).get('/api/v1/mookie');
    expect(res.body).toEqual(expected);
  });

  it('gets mookie by id', async () => {
    const mookie = await Mookie.createMookie({
      fav_toy: 'Octopus',
      num_treats: 2,
    });
    const expected = await Mookie.getMookieById(mookie.id);
    const res = await request(app).get(`/api/v1/mookie/${mookie.id}`);
    expect(res.body).toEqual({ ...expected });
  });

  it.only('updates mookie by id', async () => {
    const mookie = await Mookie.createMookie({
      fav_toy: 'Octopus',
      num_treats: 2,
    });
    const expected = await Mookie.updateMookieById(1, {
      num_treats: 5,
    });
    const res = await request(app)
      .patch(`/api/v1/mookie/${mookie.id}`)
      .send({ num_treats: 5 });
    expect(res.body).toEqual({ ...expected });
  });
});
