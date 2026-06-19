import { Router } from 'express';
import authMiddleware       from '../../middlewares/auth.middleware.js';
import instructorMiddleware from '../../middlewares/instructor.middleware.js';
import {
  create, getAll, getById, update, remove,
  assignToUser, getAthletes, getAllAthletesSchedules
} from './schedules.controller.js';

const router = Router();

router.use(authMiddleware);

// Route khusus instructor — assign jadwal ke atlet
router.get('/instructor/athletes',          instructorMiddleware, getAthletes);
router.post('/instructor/assign/:userId',   instructorMiddleware, assignToUser);
router.get('/instructor/all-schedules', instructorMiddleware, getAllAthletesSchedules);

// Route user biasa
router.post('/',    create);
router.get('/',     getAll);
router.get('/:id',  getById);
router.patch('/:id', update);
router.delete('/:id', remove);



export default router;