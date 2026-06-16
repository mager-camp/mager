import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import adminMiddleware from "../../middlewares/admin.middleware.js";

import {
  summary,
  transactions,
  methods,
  createMethod,
  updateMethod,
  deleteMethod,
} from "./adminPayments.controller.js";

const router = Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/summary", summary);
router.get("/transactions", transactions);

router.get("/methods", methods);
router.post("/methods", createMethod);
router.patch("/methods/:id", updateMethod);
router.delete("/methods/:id", deleteMethod);

export default router;