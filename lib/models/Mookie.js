const pool = require('../utils/pool');

module.exports = class Mookie {
  id;
  fav_toy;
  num_treats;

  constructor(row) {
    this.id = row.id;
    this.fav_toy = row.fav_toy;
    this.num_treats = row.num_treats;
  }

  static async createMookie({ fav_toy, num_treats }) {
    const { rows } = await pool.query(
      `
            INSERT INTO mookie(fav_toy, num_treats)
            VALUES ($1, $2)
            RETURNING
            *;
            `,
      [fav_toy, num_treats]
    );
    return new Mookie(rows[0]);
  }
};
