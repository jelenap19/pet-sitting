import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    console.log ("blaaaa");
    const user = res.json(await User.findAll());
    return res.json(user);
  } catch (err) {
    next(err);
  }
};
export const getUserByUsername = async (req, res, next) => {
  try {
    const user = await User.findByUsername(req.params.username);
    if (!user) return res.sendStatus(404);
    return res.json(user);
  } catch (err) {
    next(err);
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.sendStatus(404);
    return res.json(user);
  } catch (err) {
    next(err);
  }
};

export const postUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.update(req.params.id, req.body);
    if (!user) return res.sendStatus(404);
    return res.json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.sendStatus(404);
    await User.delete(req.params.id);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};


export const uploadProfilePicture = async (req, res, next) => {
  try {
    const userId = req.params.id;
   if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const avatarUrl = `/uploads/${req.file.filename}`;

    await User.update(userId, { avatar_url: avatarUrl });
    return res.json({ avatar_url: avatarUrl });
  } catch (err) {
    next(err);
  }
};

