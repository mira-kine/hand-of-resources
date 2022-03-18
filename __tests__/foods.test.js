const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Foods = require('../lib/models/Foods');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a food', async () => {
    const expected = {
      name: 'Katsu curry',
      cost: '500 yen',
    };
    const res = await request(app).post(`/api/v1/foods`).send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it.only('gets all foods', async () => {
    const expected = await Foods.getAllFood();
    const res = await request(app).get(`/api/v1/foods`);
    expect(res.body).toEqual(expected);
  });
});
