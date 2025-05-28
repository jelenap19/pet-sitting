import { Router } from "express";
import {
  getAllAds,
  getAdById,
  getAdByOwnerId,
  updateAd,
  postAd,
  deleteAd,
} from "../controllers/ad.controller.js";
export const adRouter = Router();

adRouter.get("/", getAllAds);
adRouter.get("/:id", getAdById);
adRouter.get("/owner/:owner_id", getAdByOwnerId);
adRouter.post("/createAd", postAd);
adRouter.put("/:id", updateAd);
adRouter.delete("/:id", deleteAd);
