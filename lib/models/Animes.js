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

  static async getAnimeById(id) {
    const { rows } = await pool.query(
      `
            SELECT *
            FROM animes
            WHERE id=$1
            `,
      [id]
    );
    if (!rows[0]) {
      return null;
    }
    return new Animes(rows[0]);
  }

  static async updateAnimeById(id, attributes) {
    const selectedAnime = await Animes.getAnimeById(id);
    const updatedInfo = { ...selectedAnime, ...attributes };
    const { name, favorite_character, year } = updatedInfo;
    const { rows } = await pool.query(
      `
            UPDATE animes
            SET name=$1, favorite_character=$2, year=$3
            WHERE id=$4
            RETURNING
            *;
          `,
      [name, favorite_character, year, id]
    );
    return new Animes(rows[0]);
  }

  static async deleteAnimeById(id) {
    const { rows } = await pool.query(
      `
            DELETE FROM
            animes
            WHERE
            id=$1
            RETURNING
            *
            `,
      [id]
    );
    return new Animes(rows[0]);
  }
};
