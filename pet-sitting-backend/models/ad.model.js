import { pool } from "../config/db.js";

export const Ad = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM ad");
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM ad WHERE id = ?", [id]);
    return rows[0] || null;
  },

  async findByOwnerId(owner_id) {
    const [rows] = await pool.query("SELECT * FROM ad WHERE owner_id = ?", [
      owner_id,
    ]);
    return rows;
  },

  async create(data) {
    const { owner_id, title, loc, created_at, description } = data;
    const [res] = await pool.query(
      `INSERT INTO ad (owner_id, title, loc, created_at , description) VALUES (?,?,?,?,?)`,
      [owner_id, title, loc, created_at, description]
    );
    return { id: res.insertId, ...data };
  },

  async update(id, data) {
    const { owner_id, title, description, location, created_at } = data;
    await pool.query(
      "UPDATE ad SET owner_id = ?, title =?, description = ?, location = ?, created_at = ?",
      [owner_id, title, description, location, created_at]
    );
    return this.findById(id);
  },

  async delete(id) {
    await pool.query("DELETE FROM ad WHERE id = ?", [id]);
    return { deleted: true };
  },
};
