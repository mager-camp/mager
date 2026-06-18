import { Router } from 'express';

import {
  register,
  login,
  me,
  googleLogin,
} from './auth.controller.js';

import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, me);
router.post('/google', googleLogin);

export default router;