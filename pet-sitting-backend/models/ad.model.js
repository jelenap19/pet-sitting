import {pool} from '../config/db.js';

export const Ad = {
  async findAll () {
    const [rows] = await pool.query('SELECT * FROM ad');
    return rows;
  },

  async findById (id) {
    const [rows] = await pool.query(
      'SELECT * FROM ad WHERE id = ?', [id]
    );
    return rows[0] || null;
  },

  async findByOwnerId (owner_id) {
    const [rows] = await pool.query(
      'SELECT * FROM ad WHERE owner_id = ?', [owner_id]
    );
    return rows;
  },

  async create (data) {
    const { owner_id, title, loc, created_at, description } = data;


    const [res] = await pool.query(
      `INSERT INTO ad
       (owner_id, title, loc, created_at , description)
       VALUES (?,?,?,?,?)`,
       [owner_id, title, loc, created_at, descriptio]   );
    return { id: res.insertId, ...data };
  },

 async update (id, patch) {
    const fields = [];
    const values = [];

    if (patch.title       !== undefined) { fields.push('title = ?');       values.push(patch.title); }
    if (patch.loc    !== undefined) { fields.push('loc = ?');    values.push(patch.loc); }
    if (patch.created_at        !== undefined) { fields.push('created_at = ?');        values.push(patch.created_at); }
    if (patch.description !== undefined) { fields.push('description = ?'); values.push(patch.description); }
    if (fields.length === 0) return this.findById(id); 
    values.push(id);  

    const sql = `UPDATE ad SET ${fields.join(', ')} WHERE id = ?`;
    await pool.query(sql, values);
    return this.findById(id);  
  },

  async delete (id) {
    await pool.query('DELETE FROM ad WHERE id = ?', [id]);
    return { deleted: true };
  }
};
