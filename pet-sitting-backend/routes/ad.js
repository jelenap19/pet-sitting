import { Router } from "express";
import {
  getAllAds,
  getAdbyId,
  getAdByOwnerId,
  updateAd,
  postAd,
  deleteAd,
} from "../controllers/ad.controller.js";
export const adRouter = Router();

adRouter.get("/", getAllads);
adRouter.get("/:id", getadById);
asRouter.get("/owner/:owner_id", getAdByOwnerId);
adRouter.post("/createAd", postAd);
adRouter.put("/:id", updateAd);
adRouter.delete("/:id", deleteAd);
