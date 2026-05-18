import { Router } from 'express';

import authMiddleware from '../../middlewares/auth.middleware.js';
import adminMiddleware from '../../middlewares/admin.middleware.js';

import {
  getAll,
  getById,
  create,
  update,
  remove
} from './courses.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  create
);

router.patch(
  '/:id',
  authMiddleware,
  adminMiddleware,
  update
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  remove
);

export default router;