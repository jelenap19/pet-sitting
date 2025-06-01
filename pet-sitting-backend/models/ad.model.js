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
    const { owner_id, title, location, created_at, description, image_url = NULL, tags = 'other'} = data;
    const [res] = await pool.query(
      `INSERT INTO ad (owner_id, title, location, created_at , description, image_url, tags) VALUES (?,?,?,?,?,?,?)`,
      [owner_id, title, location, created_at, description, image_url, tags]
    );
    return { id: res.insertId, ...data };
  },

  async update(id, data) {
    const { owner_id, title, description, location, created_at, image_url, tags } = data;
   console.log("Updating ad with ID:", id);
   console.log("image_url:", image_url);
   console.log("data", JSON.stringify(data));
    await pool.query(
      "UPDATE ad SET title =?, description = ?, location = ?, created_at = ?, image_url = ?,  tags = ? WHERE id = ?",
      [title, description, location, created_at, image_url,  tags, id]
    );
    return this.findById(id);
  },

  async delete(id) {
    await pool.query("DELETE FROM ad WHERE id = ?", [id]);
    return { deleted: true };
  },
};
