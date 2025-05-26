import {pool} from '../config/db.js';

export const User = {
    async findAll() {
        const [rows] = await pool.query(
            'SELECT * FROM users');
        return rows;
    },


    async findById(id) {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE id = ?', [id]);
        return rows[0] || null;
    },

    async create(data) {
        const { first_name, last_name, email, username, password, role_id } = data;
        const [res] = await pool.query(
            'INSERT INTO user (first_name, last_name, email, username, password, role_id) VALUES (?, ?, ?, ?, ?, ?)',
             [first_name, last_name, email, username, password, role_id]);
        return { id: res.insertId, ...data };
    }  
};