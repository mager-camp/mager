import { Router } from 'express';
import {
  getAll,
  getById
} from './activities.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);

export default router;