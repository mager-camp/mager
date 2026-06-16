import { Router } from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import adminMiddleware from "../../middlewares/admin.middleware.js";

import {
  dashboardSummary,
  users,
  premiumUsers,
  statistics,
  createUser,
  userDetail,
  updateUser,
  deactivateUser,
  activateUser,
  deleteUser,
  userPayments,
  adminProfile,
  updateProfile,
} from "./admin.controller.js";

const router = Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/dashboard-summary", dashboardSummary);
router.get("/premium-users", premiumUsers);
router.get("/statistics", statistics);
router.get("/profile", adminProfile);
router.put("/profile", updateProfile);
router.patch("/profile", updateProfile);

router.get("/users", users);
router.post("/users", createUser);
router.get("/users/:id", userDetail);
router.patch("/users/:id", updateUser);
router.put("/users/:id", updateUser);
router.patch("/users/:id/deactivate", deactivateUser);
router.patch("/users/:id/activate", activateUser);
router.delete("/users/:id", deleteUser);
router.get("/users/:id/payments", userPayments);

export default router;