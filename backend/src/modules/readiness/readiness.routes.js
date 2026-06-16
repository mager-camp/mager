import { Router } from "express";
import { getReadiness } from "./readiness.controller.js";
import authMiddleware from '../../middlewares/auth.middleware.js';


const router = Router();

router.get("/", authMiddleware, getReadiness);

export default router;