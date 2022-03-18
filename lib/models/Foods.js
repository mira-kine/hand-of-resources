const pool = require('../utils/pool');

module.exports = class Foods {
  id;
  name;
  cost;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.cost = row.cost;
  }

  static async createFood({ name, cost }) {
    const { rows } = await pool.query(
      `
            INSERT INTO foods(name, cost)
            VALUES ($1, $2)
            RETURNING
            *;
            `,
      [name, cost]
    );
    return new Foods(rows[0]);
  }
};
