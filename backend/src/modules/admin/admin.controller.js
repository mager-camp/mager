import {
  getDashboardSummary,
  getAdminUsers,
  getPremiumUsers,
  getAdminStatistics,
  createAdminUser,
  getAdminUserDetail,
  updateAdminUser,
  deactivateAdminUser,
  activateAdminUser,
  deleteAdminUser,
  getAdminUserPayments,
  getAdminProfile,
  updateAdminProfile,
} from "./admin.service.js";

const ok = (res, data, message = undefined) => {
  res.json({ success: true, ...(message ? { message } : {}), data });
};

export const dashboardSummary = async (req, res, next) => {
  try {
    ok(res, await getDashboardSummary());
  } catch (error) {
    next(error);
  }
};

export const users = async (req, res, next) => {
  try {
    ok(res, await getAdminUsers());
  } catch (error) {
    next(error);
  }
};

export const premiumUsers = async (req, res, next) => {
  try {
    ok(res, await getPremiumUsers());
  } catch (error) {
    next(error);
  }
};

export const statistics = async (req, res, next) => {
  try {
    ok(res, await getAdminStatistics());
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const data = await createAdminUser(req.body);
    res.status(201).json({ success: true, message: "User berhasil dibuat", data });
  } catch (error) {
    next(error);
  }
};

export const userDetail = async (req, res, next) => {
  try {
    ok(res, await getAdminUserDetail(req.params.id));
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    ok(res, await updateAdminUser(req.params.id, req.body), "User berhasil diperbarui");
  } catch (error) {
    next(error);
  }
};

export const deactivateUser = async (req, res, next) => {
  try {
    ok(res, await deactivateAdminUser(req.params.id), "User berhasil dinonaktifkan");
  } catch (error) {
    next(error);
  }
};

export const activateUser = async (req, res, next) => {
  try {
    ok(res, await activateAdminUser(req.params.id), "User berhasil diaktifkan");
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    ok(res, await deleteAdminUser(req.params.id), "User berhasil dihapus permanen");
  } catch (error) {
    next(error);
  }
};

export const userPayments = async (req, res, next) => {
  try {
    ok(res, await getAdminUserPayments(req.params.id));
  } catch (error) {
    next(error);
  }
};

export const adminProfile = async (req, res, next) => {
  try {
    ok(res, await getAdminProfile(req.user.id));
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    ok(res, await updateAdminProfile(req.user.id, req.body), "Pengaturan admin berhasil disimpan");
  } catch (error) {
    next(error);
  }
};
