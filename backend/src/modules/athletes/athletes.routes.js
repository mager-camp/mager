import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { getAthletes } from './athletes.controller.js';

const router = Router();

router.get('/', authMiddleware, getAthletes);

export default router;