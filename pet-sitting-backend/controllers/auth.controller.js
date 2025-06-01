import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import "dotenv/config.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "12h";

export const register = async (req, res, next) => {
  console.log("Registering user...");
  try {
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      description = "",
      avatar_url = "",
    } = req.body;

    if( !first_name) {
      console.log("First name is missing");
      return res.status(400).json({ message: "First name is required" });
    }
    if( !last_name) {
      console.log("Last name is missing");
      return res.status(400).json({ message: "Last name is required" });
    }
    if( !email) {
      console.log("Email is missing");
      return res.status(400).json({ message: "Email is required" });
    }
    if( !username) {
      console.log("Username is missing");
      return res.status(400).json({ message: "Username is required" });
    }
    if( !password) {
      console.log("Password is missing");
      return res.status(400).json({ message: "Password is required" });
    }


    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }
    console.log("Creating new user...");
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      username,
      description,
      password,
      role_id: 2,
      avatar_url: "/uploads/default_avatar.png",
    });

    const payload = { userId: newUser.id, role: "REGISTERED" };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.status(201).json({
      user: {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        username: newUser.username,
        description: newUser.description,
        role_id: newUser.role_id,
        avatar_url: newUser.avatar_url,
        created_at: newUser.created_at,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const valid = await User.verifyPassword(username, password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = await User.findByUsername(username);

    const payload = { userId: user.id, role_id: user.role_id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.json({
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: user.username,
        description: user.description,
        role_id: user.role_id,
        created_at: user.created_at,
        avatar_url: user.avatar_url,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};
