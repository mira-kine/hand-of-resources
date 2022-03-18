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

  static async getAllFood() {
    const { rows } = await pool.query(
      `
            SELECT *
            FROM foods
            `
    );
    return rows.map((item) => new Foods(item));
  }

  static async getFoodById(id) {
    const { rows } = await pool.query(
      `
            SELECT *
            FROM foods
            WHERE id=$1
            `,
      [id]
    );
    return new Foods(rows[0]);
  }

  static async updateFoodById(id, attributes) {
    const selectedFood = await Foods.getFoodById(id);
    const updatedInfo = { ...selectedFood, ...attributes };
    const { name, cost } = updatedInfo;
    const { rows } = await pool.query(
      `
          UPDATE foods
          SET name=$1, cost=$2
          WHERE id=$3
          RETURNING *;
          `,
      [name, cost, id]
    );
    return new Foods(rows[0]);
  }
};
