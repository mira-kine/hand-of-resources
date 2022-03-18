const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Books = require('../lib/models/Books');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create book', async () => {
    const expected = {
      name: 'Crying in H Mart',
      author: 'Michelle Zauner',
    };
    const res = await request(app).post('/api/v1/books').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it.only('gets all books', async () => {
    const expected = await Books.getAllBooks();
    const res = await request(app).get('/api/v1/books');
    expect(res.body).toEqual(expected);
  });
});
