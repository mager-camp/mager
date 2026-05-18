import { Router } from 'express';

import authMiddleware from '../../middlewares/auth.middleware.js';

import {
  create,
  getAll,
  getById,
  update,
  remove
} from './schedules.controller.js';

const router = Router();

router.use(authMiddleware);

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;