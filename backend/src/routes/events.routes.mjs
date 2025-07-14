import express from 'express';
import { createEvent , getEvents , deleteEvent } from '../controllers/event.controller.mjs';
import { verifyToken } from '../middleware/auth.middleware.mjs';
import { upload } from '../middleware/upload.middleware.mjs';

const router = express.Router();

router.post('/',verifyToken, upload.array('photos', 5),createEvent);
router.get('/',verifyToken, getEvents);
router.delete('/:id',verifyToken, deleteEvent);

export default router;
