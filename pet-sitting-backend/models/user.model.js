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
      "SELECT id, first_name, last_name, email, username, description, role_id, created_at, password_hash, avatar_url FROM users WHERE username = ?",
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
      avatar_url = "uploads/default_avatar.png",
    } = data;

    const passwordHash1 = await bcrypt.hash(password, SALT_ROUNDS);
    const [res] = await pool.query(
      "INSERT INTO users (first_name, last_name, email, description, username, password_hash, role_id, avatar_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        first_name,
        last_name,
        email,
        description,
        username,
        passwordHash1,
        role_id,
        avatar_url,
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
      avatar_url,
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
      avatar_url = "",
    } = data;

    if (password) {
      passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      await pool.query(
        `UPDATE users
           SET first_name = ?, last_name = ?, email = ?,
               username = ?, description = ?, password_hash = ?, role_id = ?, avatar_url = ?
         WHERE id = ?`,
        [
          first_name,
          last_name,
          email,
          username,
          description,
          passwordHash,
          role_id,
          avatar_url,
          id,
        ]
      );
    } else {
      await pool.query(
        `UPDATE users
           SET first_name = ?, last_name = ?, email = ?,
               username = ?, description = ?, role_id = ?, avatar_url = ?
         WHERE id = ?`,
        [
          first_name,
          last_name,
          email,
          username,
          description,
          role_id,
          avatar_url,
          id,
        ]
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
    console.log("User found:", user);
    return bcrypt.compare(plainPassword, user.password_hash);
  },
};
