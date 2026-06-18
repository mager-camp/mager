import { Router } from 'express';

import authMiddleware from '../../middlewares/auth.middleware.js';

import {
    getStats,
} from './pl-dash.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/stats', getStats);

export default router;