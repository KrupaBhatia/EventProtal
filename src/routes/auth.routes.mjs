import express from 'express';
import { loginUser , logoutUser} from '../controllers/auth.controller.mjs';
import { verifyToken} from "../middleware/auth.middleware.mjs";
import { loginRateLimiter } from "../middleware/ratelimit.middleware.mjs";

const router = express.Router();

router.post('/login',loginRateLimiter, loginUser);
router.post('/logout',verifyToken , logoutUser);


export default router;
