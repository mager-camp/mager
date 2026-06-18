import {
  createPremiumTransaction,
  handleMidtransWebhook,
  getInvoice,
  getLastInvoice,
  PREMIUM_PACKAGES,
} from "./premium.payment.service.js";

// GET /premium-payment/packages
export const getPackages = (req, res) => {
  res.json({ success: true, data: PREMIUM_PACKAGES });
};

// POST /premium-payment/create
export const createTransaction = async (req, res, next) => {
  try {
    const { packageKey = "1-bulan" } = req.body;
    const data = await createPremiumTransaction(req.user.id, packageKey);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

// POST /premium-payment/webhook  (no auth — called by Midtrans)
export const midtransWebhook = async (req, res, next) => {
  try {
    const result = await handleMidtransWebhook(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// GET /premium-payment/invoice/:invoiceNumber
export const getInvoiceDetail = async (req, res, next) => {
  try {
    const data = await getInvoice(req.params.invoiceNumber, req.user.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getLastInvoiceNumber = async (req, res, next) => {
  try {
    const data = await getLastInvoice(req.user.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};