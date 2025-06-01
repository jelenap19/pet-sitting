import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import {
  getAllAds,
  getAdById,
  getAdByOwnerId,
  updateAd,
  createAd as postAd,
  deleteAd,
  uploadAdImage
} from "../controllers/ad.controller.js";
import { upload } from "../middleware/upload.middleware.js";

export const adRouter = Router();

adRouter.get("/", getAllAds);
adRouter.get("/:id", getAdById);
adRouter.get("/owner/:owner_id", getAdByOwnerId);
adRouter.post("/createAd", requireAuth, requireRole([1, 2]), postAd);
adRouter.put("/:id", requireAuth, requireRole([1, 2]), updateAd);
adRouter.delete("/:id", requireAuth, requireRole([1, 2]), deleteAd);
adRouter.post("/:id/image", requireAuth, requireRole([1, 2]), upload.single("image"), uploadAdImage);