import { Router } from "express";
import authMiddleware from "../../../middlewares/auth.middleware.js";
import {
  getPackages,
  createTransaction,
  midtransWebhook,
  getInvoiceDetail,
  getLastInvoiceNumber,
} from "./premium.payment.controller.js";

const router = Router();

// Public — Midtrans webhook (ga perlu auth)
router.post("/webhook", midtransWebhook);

// Auth required
router.use(authMiddleware);
router.get("/packages",             getPackages);
router.post("/create",              createTransaction);
router.get("/invoice/:invoiceNumber", getInvoiceDetail);
router.get("/last-invoice", getLastInvoiceNumber);

export default router;