import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { getToday } from './notifications.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/today', getToday);

export default router;