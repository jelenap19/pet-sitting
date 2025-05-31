import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
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
commentRouter.delete("/:id", requireAuth, requireRole([1, 2]), deleteComment);
commentRouter.post(
  "/ad/:ad_id/newComment",
  requireAuth,
  requireRole([1, 2]),
  postComment
);
