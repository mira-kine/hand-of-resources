const pool = require('../utils/pool');

module.exports = class Books {
  id;
  name;
  author;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.author = row.author;
  }

  static async createBook({ name, author }) {
    const { rows } = await pool.query(
      `
        INSERT INTO books(name, author)
        VALUES ($1, $2)
        RETURNING
        *;
        `,
      [name, author]
    );
    return new Books(rows[0]);
  }
};
