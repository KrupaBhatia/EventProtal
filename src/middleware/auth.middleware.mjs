import jwt from 'jsonwebtoken';
import db from '../models/index.js'; 
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }


    if (user.lastSessionToken !== token) {
      return res.status(401).json({ message: 'You have been logged in from another device' });
    }

   
    req.user = user;
    next();

  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};
