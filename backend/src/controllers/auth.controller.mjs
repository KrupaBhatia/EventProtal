import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../../config/sequelize.js';

dotenv.config();
const { User } = db;

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    user.lastSessionToken = token;
    await user.save();

    res.status(200).json({ token, message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logoutUser = async (req, res) => {
    try {
      req.user.lastSessionToken = null;
      await req.user.save();
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
      console.error('Logout error:', err);
      res.status(500).json({ message: 'Server error during logout' });
    }
  };
  
