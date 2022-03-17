const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { createSong } = require('../lib/models/Songs');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should get all songs', async () => {
    await createSong({
      name: 'Eventually',
      artist: 'Tame Impala',
    });
    await createSong({
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
});
