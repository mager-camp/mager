import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { getToday,  getUnread, markAll, markOne } from './notifications.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/today', getToday);
router.get('/',              getUnread);
router.patch('/mark-all',    markAll);
router.patch('/:id/read',    markOne);

export default router;