import { Role } from "../models/role.model.js";

export const getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.findAll();
    return res.json(roles);
  } catch (err) {
    next(err);
  }
};
