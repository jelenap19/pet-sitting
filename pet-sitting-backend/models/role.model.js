import {pool} from '../config/db.js';

export const Role = {
 async findAll () {
    const [rows] = await pool.query('SELECT * FROM role');
    return rows;
  },

async findById (id) {
    const [rows] = await pool.query(
      'SELECT * FROM ROLE WHERE id = ?', [id]
    );
    return rows[0] || null;
  },

 async create (type) {          
        const [res] = await pool.query(
      'INSERT INTO role (type) VALUES (?)', [type]
    );
    return { id: res.insertId, type: type };
  }
};
