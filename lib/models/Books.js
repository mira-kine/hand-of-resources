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

  static async getAllBooks() {
    const { rows } = await pool.query(
      `
            SELECT 
            *
            FROM
            books
            `
    );
    return rows.map((item) => new Books(item));
  }

  static async getBookById(id) {
    const { rows } = await pool.query(
      `
        SELECT *
        FROM books
        WHERE id=$1        
        `,
      [id]
    );
    if (!rows[0]) {
      return null;
    }
    return new Books(rows[0]);
  }
};
