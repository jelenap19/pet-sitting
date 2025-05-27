import { Router } from "express";
import {
  getAllComments,
  getCommentById,
  getCommentsByAdId,
  getCommentsByOwnerId,
  postComment,
  deleteComment,
} from "../controllers/comment.controller.js";

export const commentRouter = Router();

commentRouter.get("/", getAllComments);
commentRouter.get("/:id", getCommentById);
commentRouter.get("/ad/:ad_id", getCommentsByAdId);
commentRouter.get("/owner/:owner_id", getCommentsByOwnerId);
commentRouter.post("/ad/:ad_id/newComment", postComment);
commentRouter.delete("/:id", deleteComment);
