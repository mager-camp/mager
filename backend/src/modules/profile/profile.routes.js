import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware.js';

import {
  getMe,
  updateMe,
  updatePassword,
  removeAccount
} from './profile.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getMe);
router.patch('/', updateMe);
router.patch(
  '/change-password',
  updatePassword
);
router.delete('/', removeAccount);

export default router;