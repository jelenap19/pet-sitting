import { pool } from "../config/db.js";

export const Role = {
  async findAll() {
    const [rows] = await pool.query("SELECT id, type FROM role");
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT id, type FROM role WHERE id = ?", [
      id,
    ]);
    return rows[0] || null;
  },
};
