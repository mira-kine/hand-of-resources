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

  it('gets all foods', async () => {
    const expected = await Foods.getAllFood();
    const res = await request(app).get(`/api/v1/foods`);
    expect(res.body).toEqual(expected);
  });

  it('gets food by id', async () => {
    const food = await Foods.createFood({
      name: 'Katsu curry',
      cost: '500 yen',
    });
    const expected = await Foods.getFoodById(food.id);
    const res = await request(app).get(`/api/v1/foods/${food.id}`);
    expect(res.body).toEqual(expected);
  });

  it('updates food by id', async () => {
    const food = await Foods.createFood({
      name: 'Katsu curry',
      cost: '500 yen',
    });
    const expected = await Foods.updateFoodById(1, { cost: '200 yen' });
    const res = await request(app)
      .patch(`/api/v1/foods/${food.id}`)
      .send({ cost: '200 yen' });
    expect(res.body).toEqual({ ...expected });
  });
});
