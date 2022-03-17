const pool = require('../utils/pool');

module.exports = class Songs {
  id;
  name;
  artist;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.artist = row.artist;
  }

  static async createSong({ name, artist }) {
    const { rows } = await pool.query(
      `
          INSERT INTO songs(name, artist)
          VALUES ($1, $2)
          RETURNING
          *;
        `,
      [name, artist]
    );
    return new Songs(rows[0]);
  }

  static async getAllSongs() {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM songs
      `
    );
    return rows.map((item) => new Songs(item));
  }

  static async getSongById(id) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM songs
      WHERE id=$1
      `,
      [id]
    );
    return new Songs(rows[0]);
  }
};
