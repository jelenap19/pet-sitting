import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const User = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] || null;
  },

  async findByUsername(username) {
    const [rows] = await pool.query(
      "SELECT id, first_name, last_name, email, username, description, role_id, created_at, password_hash FROM users WHERE username = ?",
      [username]
    );
    return rows[0] || null;
  },

  async create(data) {
    const {
      first_name,
      last_name,
      email,
      description = "",
      username,
      password,
      role_id,
    } = data;

    const passwordHash1 = await bcrypt.hash(password, SALT_ROUNDS);
    const [res] = await pool.query(
      "INSERT INTO users (first_name, last_name, email, description, username, password_hash, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        first_name,
        last_name,
        email,
        description,
        username,
        passwordHash1,
        role_id,
      ]
    );
    return {
      id: res.insertId,
      first_name,
      last_name,
      email,
      username,
      description,
      role_id,
      created_at: new Date().toISOString(),
    };
  },

  async update(id, data) {
    const {
      first_name,
      last_name,
      email,
      username,
      description = "",
      password,
      role_id,
    } = data;

    // let password;
    if (password) {
      passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      await pool.query(
        `UPDATE users
           SET first_name = ?, last_name = ?, email = ?,
               username = ?, description = ?, password_hash = ?, role_id = ?
         WHERE id = ?`,
        [
          first_name,
          last_name,
          email,
          username,
          description,
          passwordHash,
          role_id,
          id,
        ]
      );
    } else {
      await pool.query(
        `UPDATE users
           SET first_name = ?, last_name = ?, email = ?,
               username = ?, description = ?, role_id = ?
         WHERE id = ?`,
        [first_name, last_name, email, username, description, role_id, id]
      );
    }
    return this.findById(id);
  },

  async delete(id) {
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return { deleted: true };
  },

  async verifyPassword(username, plainPassword) {
    const user = await this.findByUsername(username);
    if (!user) return false;
    return bcrypt.compare(plainPassword, user.password);
  },
};
