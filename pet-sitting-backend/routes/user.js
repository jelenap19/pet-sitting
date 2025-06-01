import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
  uploadProfilePicture,
  getUserByUsername
} from "../controllers/user.controller.js";
import {upload} from "../middleware/upload.middleware.js";

export const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/username/:username", getUserByUsername);
userRouter.get("/:id", getUserById);
userRouter.post("/", postUser);
userRouter.put("/:id", requireAuth, requireRole([1, 2]), updateUser);
userRouter.delete("/:id", requireAuth, requireRole([1, 2]), deleteUser);
userRouter.post("/:id/avatar", upload.single("avatar"), uploadProfilePicture);