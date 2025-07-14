import express from 'express';
import { createCategory, getAllCategories } from '../controllers/category.controller.mjs';
import { verifyToken } from '../middleware/auth.middleware.mjs';

const router = express.Router();

router.post('/',verifyToken, createCategory);
router.get('/',verifyToken, getAllCategories);

export default router;
