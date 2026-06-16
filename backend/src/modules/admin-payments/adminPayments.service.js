import {
  getAdminPaymentSummaryRepo,
  getAdminPaymentTransactionsRepo,
  getPaymentMethodsRepo,
  createPaymentMethodRepo,
  updatePaymentMethodRepo,
  deletePaymentMethodRepo,
} from "./adminPayments.repository.js";

const PACKAGE_LABELS = {
  "1-bulan": "Paket Premium 1 Bulan",
};

const formatPayment = (payment) => {
  return {
    id: payment.id,
    orderId: payment.orderId,
    invoiceNumber: payment.invoiceNumber,
    packageKey: payment.packageKey,
    packageLabel: PACKAGE_LABELS[payment.packageKey] || payment.packageKey,
    amount: Number(payment.amount ?? 0),
    status: payment.status,
    paymentMethod: payment.paymentMethod || "-",
    paidAt: payment.paidAt,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,

    userId: payment.userId,
    userName: payment.user?.fullName || "-",
    userEmail: payment.user?.email || "-",
    userPhone: payment.user?.phone || "-",
  };
};

const createHttpError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const getAdminPaymentSummary = async () => {
  return getAdminPaymentSummaryRepo();
};

export const getAdminPaymentTransactions = async (query = {}) => {
  const items = await getAdminPaymentTransactionsRepo({
    status: query.status,
  });

  return {
    total: items.length,
    items: items.map(formatPayment),
  };
};

export const getPaymentMethods = async () => {
  const items = await getPaymentMethodsRepo();

  return {
    total: items.length,
    items,
  };
};

export const createPaymentMethod = async (payload) => {
  if (!payload.name) {
    throw createHttpError("Nama metode pembayaran wajib diisi", 422);
  }

  if (!payload.category) {
    throw createHttpError("Kategori metode pembayaran wajib diisi", 422);
  }

  if (!["bank_transfer", "ewallet"].includes(payload.category)) {
    throw createHttpError("Kategori metode pembayaran tidak valid", 422);
  }

  return createPaymentMethodRepo(payload);
};

export const updatePaymentMethod = async (id, payload) => {
  if (!id) {
    throw createHttpError("ID metode pembayaran tidak ditemukan", 422);
  }

  if (payload.category && !["bank_transfer", "ewallet"].includes(payload.category)) {
    throw createHttpError("Kategori metode pembayaran tidak valid", 422);
  }

  return updatePaymentMethodRepo(id, payload);
};

export const deletePaymentMethod = async (id) => {
  if (!id) {
    throw createHttpError("ID metode pembayaran tidak ditemukan", 422);
  }

  return deletePaymentMethodRepo(id);
};