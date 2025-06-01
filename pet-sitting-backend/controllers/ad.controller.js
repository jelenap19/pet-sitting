import { Ad } from "../models/ad.model.js";
import fs from "fs/promises";
export const getAllAds = async (req, res, next) => {
  try {
    const ads = await Ad.findAll();
    return res.json(ads);
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
    const ads = await Ad.findByOwnerId(req.params.owner_id);
    return res.json(ads);
  } catch (err) {
    next(err);
  }
};

export const createAd = async (req, res, next) => {
  try {
    const { owner_id, title, location, description, image_url, tags } =
      req.body;

    if (!owner_id || !title || !location || !description) {
      return res.status(400).json({
        message: "owner_id, title, location, and description are required",
      });
    }

    const newAd = await Ad.create({
      owner_id,
      title,
      location,
      description,
      image_url,
      tags,
    });
    return res.status(201).json(newAd);
  } catch (err) {
    next(err);
  }
};

export const updateAd = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.sendStatus(404);

    const { title, location, description, image_url, tags } = req.body;

    const updated = await Ad.update(req.params.id, {
      title,
      location,
      description,
      image_url,
      tags,
    });
    return res.json(updated);
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

export const uploadAdImage = async (req, res, next) => {
  try {
    const adId = req.params.id;

    const existingAd = await Ad.findById(adId);
    if (!existingAd) {
      return res.sendStatus(404);
    }

    if (!req.file || !req.file.filename) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const filename = req.file.filename;
    const imageUrl = `/uploads/${filename}`;

    existingAd.image_url = imageUrl;
    await Ad.update(adId, existingAd);

    console.log(`Image saved for ad ${adId}: ${imageUrl}`);

    return res.json({ image_url: imageUrl });
  } catch (err) {
    next(err);
  }
};
