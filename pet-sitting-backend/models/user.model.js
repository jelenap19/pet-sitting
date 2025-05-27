import { pool } from "../config/db.js";

export const User = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] || null;
  },

  async create(data) {
    const {
      first_name,
      last_name,
      email,
      description,
      username,
      password_hash,
      role_id,
    } = data;
    const [res] = await pool.query(
      "INSERT INTO users (first_name, last_name, email, description, username, password_hash, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        first_name,
        last_name,
        email,
        description,
        username,
        password_hash,
        role_id,
      ]
    );
    return { id: res.insertId, ...data };
  },

  async update(id, data) {
    const { password_hash } = data;
    await pool.query(`UPDATE users SET password_hash = ? WHERE id = ?`, [
      password_hash,
      id,
    ]);
    return this.findById(id);
  },

  async delete(id) {
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return { deleted: true };
  },
};
