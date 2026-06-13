import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import premiumMiddleware from "../../middlewares/premium.middleware.js";
import { status, periodisasi } from "./premium.controller.js";

const router = Router();

router.use(authMiddleware);

// Status bisa diakses semua user (buat tau dia premium atau belum)
router.get("/status", status);

// Periodisasi hanya untuk user premium aktif
router.get("/periodisasi", premiumMiddleware, periodisasi);

export default router;

