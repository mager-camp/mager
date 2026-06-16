import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import scheduleRoutes from '../modules/schedules/schedules.routes.js';
import activityRoutes from '../modules/activities/activities.routes.js';
import workoutLogsRoutes from '../modules/workout-logs/workoutLogs.routes.js';
import dashboardRoutes from '../modules/dashboard/dashboard.routes.js';
import notificationsRoutes from '../modules/notifications/notifications.routes.js';
import profileRoutes from '../modules/profile/profile.routes.js';
import coursesRoutes from '../modules/courses/courses.routes.js';
import premiumRoutes from '../modules/premium/premium.routes.js';
import premiumPaymentRoutes from '../modules/premium/payment/premium.payment.routes.js';
import supportRoutes from '../modules/support/support.routes.js';
import readinessRoutes from "../modules/readiness/readiness.routes.js";
import adminRoutes from '../modules/admin/admin.routes.js';
import adminPaymentRoutes from "../modules/admin-payments/adminPayments.routes.js";

const router = Router();

router.use('/auth', authRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/activities', activityRoutes);
router.use(
  '/workout-logs',
  workoutLogsRoutes
);
router.use('/dashboard', dashboardRoutes);
router.use(
  '/notifications',
  notificationsRoutes
);
router.use('/profile', profileRoutes);
router.use('/courses', coursesRoutes);
router.use('/premium', premiumRoutes);
router.use('/premium-payment', premiumPaymentRoutes);
router.use('/support', supportRoutes);
router.use("/readiness", readinessRoutes);
router.use('/admin', adminRoutes);
router.use("/admin-payments", adminPaymentRoutes);

export default router;