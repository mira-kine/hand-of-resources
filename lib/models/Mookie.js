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

  static async getAllMookie() {
    const { rows } = await pool.query(
      `
          SELECT *
          FROM mookie
          `
    );
    return rows.map((item) => new Mookie(item));
  }

  static async getMookieById(id) {
    const { rows } = await pool.query(
      `
            SELECT *
            FROM mookie
            WHERE id=$1
            `,
      [id]
    );
    if (!rows[0]) {
      return null;
    }
    return new Mookie(rows[0]);
  }

  static async updateMookieById(id, attributes) {
    const selectedMookie = await Mookie.getMookieById(id);
    const updatedInfo = { ...selectedMookie, ...attributes };
    const { fav_toy, num_treats } = updatedInfo;
    const { rows } = await pool.query(
      `
          UPDATE mookie
          SET fav_toy=$1, num_treats=$2
          WHERE id=$3
          RETURNING *;
          `,
      [fav_toy, num_treats, id]
    );
    return new Mookie(rows[0]);
  }
};
