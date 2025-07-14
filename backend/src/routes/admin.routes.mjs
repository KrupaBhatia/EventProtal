import express from 'express';
import { getAllEventsWithStatus } from '../controllers/admin.controller.mjs';

const router = express.Router();

router.get('/events', getAllEventsWithStatus); 

export default router;
