import { pool } from "../config/db.js";

export const Comment = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM comments");
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [id]);
    return rows[0] || null;
  },

  async findByAdId(ad_id) {
    const [rows] = await pool.query("SELECT * FROM comments WHERE ad_id = ?", [
      ad_id,
    ]);
    return rows;
  },

  async findByOwnerId(owner_id) {
    const [rows] = await pool.query(
      "SELECT * FROM comments WHERE owner_id = ?",
      [owner_id]
    );
    return rows;
  },

  async create(data) {
    const { ad_id, owner_id, comment_text, created_at } = data;
    const [res] = await pool.query(
      `INSERT INTO comments (ad_id, owner_id, comment_text, created_at) VALUES (?,?,?,?)`,
      [ad_id, owner_id, comment_text, created_at]
    );
    return { id: res.insertId, ...data };
  },

  async delete(id) {
    await pool.query("DELETE FROM comments WHERE id = ?", [id]);
    return { deleted: true };
  },
};
