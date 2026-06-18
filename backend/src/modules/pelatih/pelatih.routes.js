import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import pelatihMiddleware from "../../middlewares/pelatih.middleware.js";
import {
  dashboard,
  atletList,
  kursusList,
  jadwalList,
} from "./pelatih.controller.js";

const router = Router();

router.use(authMiddleware, pelatihMiddleware);

router.get("/dashboard", dashboard);
router.get("/atlet", atletList);
router.get("/kursus", kursusList);
router.get("/jadwal", jadwalList);

export default router;