import { Router } from "express";
import authMiddleware       from "../../middlewares/auth.middleware.js";
import instructorMiddleware from "../../middlewares/instructor.middleware.js";
import {
  getAll, getStats, getById,
  create, update, remove, markModuleComplete,
} from "./courses.controller.js";

const router = Router();

router.get("/",      getAll);
router.get("/stats", getStats);
router.get("/:id",   authMiddleware, getById);

router.post(   "/",    authMiddleware, create);
router.patch(  "/:id", authMiddleware, instructorMiddleware, update);
router.delete( "/:id", authMiddleware, instructorMiddleware, remove);

router.post("/modules/:moduleId/complete", authMiddleware, markModuleComplete);

export default router;