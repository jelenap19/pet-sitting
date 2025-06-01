import { Comment } from "../models/comment.model.js";

export const getAllComments = async (req, res, next) => {
  try {
    const com = await Comment.findAll();
    return res.json(com);
  } catch (err) {
    next(err);
  }
};

export const getCommentById = async (req, res, next) => {
  try {
    const com = await Comment.findById(req.params.id);
    if (!com) return res.sendStatus(404);
    return res.json(com);
  } catch (err) {
    next(err);
  }
};

export const getCommentsByOwnerId = async (req, res, next) => {
  try {
    const com = await Comment.findByOwnerId(req.params.owner_id);
    return res.json(com);
  } catch (err) {
    next(err);
  }
};

export const getCommentsByAdId = async (req, res, next) => {
  try {
    const com = await Comment.findByAdId(req.params.ad_id);
    return res.json(com);
  } catch (err) {
    next(err);
  }
};

export const postComment = async (req, res, next) => {
  try {
    console.log("tu smo");
    const com = await Comment.create(req.body);
    return res.status(201).json(com);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const com = await Comment.findById(req.params.id);
    if (!com) return res.sendStatus(404);
    await Comment.delete(req.params.id);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
