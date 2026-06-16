import {
  getAdminPaymentSummary,
  getAdminPaymentTransactions,
  getPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} from "./adminPayments.service.js";

const ok = (res, data, message) => {
  res.json({
    success: true,
    ...(message ? { message } : {}),
    data,
  });
};

export const summary = async (req, res, next) => {
  try {
    const data = await getAdminPaymentSummary();
    ok(res, data);
  } catch (error) {
    next(error);
  }
};

export const transactions = async (req, res, next) => {
  try {
    const data = await getAdminPaymentTransactions(req.query);
    ok(res, data);
  } catch (error) {
    next(error);
  }
};

export const methods = async (req, res, next) => {
  try {
    const data = await getPaymentMethods();
    ok(res, data);
  } catch (error) {
    next(error);
  }
};

export const createMethod = async (req, res, next) => {
  try {
    const data = await createPaymentMethod(req.body);

    res.status(201).json({
      success: true,
      message: "Metode pembayaran berhasil ditambahkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMethod = async (req, res, next) => {
  try {
    const data = await updatePaymentMethod(req.params.id, req.body);
    ok(res, data, "Metode pembayaran berhasil diperbarui");
  } catch (error) {
    next(error);
  }
};

export const deleteMethod = async (req, res, next) => {
  try {
    const data = await deletePaymentMethod(req.params.id);
    ok(res, data, "Metode pembayaran berhasil dihapus");
  } catch (error) {
    next(error);
  }
};