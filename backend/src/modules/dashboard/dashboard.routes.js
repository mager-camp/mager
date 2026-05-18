import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware.js';
import {
  summary,
  weeklyProgress,
  monthlyProgress
} from './dashboard.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/summary', summary);
router.get(
  '/weekly-progress',
  weeklyProgress
);
router.get(
  '/monthly-progress',
  monthlyProgress
);

export default router;