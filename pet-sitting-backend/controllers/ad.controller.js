import { Ad } from "../models/ad.model.js";

export const getAllAds = async (req, res, next) => {
  try {
    const ad = await Ad.findAll();
    return res.json(ad);
  } catch (err) {
    next(err);
  }
};

export const getAdById = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.sendStatus(404);
    return res.json(ad);
  } catch (err) {
    next(err);
  }
};

export const getAdByOwnerId = async (req, res, next) => {
  try {
    const ad = await Ad.findByOwnerId(req.params.owner_id);
    return res.json(ad);
  } catch (err) {
    next(err);
  }
};

export const postAd = async (req, res, next) => {
  try {
    const ad = await Ad.create(req.body);
    return res.status(201).json(ad);
  } catch (err) {
    next(err);
  }
};

export const updateAd = async (req, res, next) => {
  try {
    const ad = await Ad.update(req.params.id, req.body);
    if (!ad) return res.sendStatus(404);
    return res.json(ad);
  } catch (err) {
    next(err);
  }
};

export const deleteAd = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.sendStatus(404);
    await Ad.delete(req.params.id);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
