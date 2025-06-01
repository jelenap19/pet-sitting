import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = {
      id: payload.userId,
      role_id: payload.role_id
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


export const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    if (!allowedRoles.includes(req.user.role_id)) {
      console.log(`Access denied for user with role ${req.user.role_id}`);
      console.log(`Access denied for user  ${JSON.stringify(req.user)}`);
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
