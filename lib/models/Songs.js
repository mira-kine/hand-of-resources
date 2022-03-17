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

  static async updateSongbyId(id, attributes) {
    const selectedSong = await Songs.getSongById(id);
    const updatedInfo = { ...selectedSong, ...attributes };
    const { name, artist } = updatedInfo;
    const { rows } = await pool.query(
      `
      UPDATE songs
      SET name=$1, artist=$2
      WHERE id=$3
      RETURNING *;
      `,
      [name, artist, id]
    );
    return new Songs(rows[0]);
  }

  static async deleteSongById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        songs
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );
    return new Songs(rows[0]);
  }
};
