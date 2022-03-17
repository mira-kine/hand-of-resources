const pool = require('../utils/pool');

module.exports = class Animes {
  id;
  name;
  favorite_character;
  year;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.favorite_character = row.favorite_character;
    this.year = row.year;
  }

  static async createAnime({ name, favorite_character, year }) {
    const { rows } = await pool.query(
      `
            INSERT INTO animes(name, favorite_character, year)
            VALUES ($1, $2, $3)
            RETURNING
            *;
            `,
      [name, favorite_character, year]
    );
    return new Animes(rows[0]);
  }

  static async getAllAnime() {
    const { rows } = await pool.query(
      `
    SELECT *
    FROM animes
    `
    );
    return rows.map((item) => new Animes(item));
  }
};
