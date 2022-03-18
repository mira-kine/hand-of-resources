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

  it('gets all books', async () => {
    const expected = await Books.getAllBooks();
    const res = await request(app).get('/api/v1/books');
    expect(res.body).toEqual(expected);
  });

  it('gets book by id', async () => {
    const book = await Books.createBook({
      name: 'Crying in H Mart',
      author: 'Michelle Zauner',
    });
    const expected = await Books.getBookById(book.id);
    const res = await request(app).get(`/api/v1/books/${book.id}`);
    expect(res.body).toEqual({ ...expected });
  });

  it.only('updates book by id', async () => {
    await Books.createBook({
      name: 'Crying in H Mart',
      author: 'Michelle Zauner',
    });
    const expected = {
      id: expect.any(String),
      name: 'Crying',
      author: 'Michelle Zauner',
    };
    const res = await request(app)
      .patch(`/api/v1/books/1`)
      .send({ name: 'Crying' });
    expect(res.body).toEqual({ ...expected });
  });
});
