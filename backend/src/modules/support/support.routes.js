import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { create, getMyTickets } from "./support.controller.js";

const router = Router();

router.use(authMiddleware);
router.post("/",    create);
router.get("/mine", getMyTickets);

export default router;