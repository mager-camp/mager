import { ROLES } from "../../constants/roles.js";
import { hashPassword } from "../../utils/hash.js";
import {
 getDashboardSummaryRepo,
  getAdminUsersRepo,
  getPremiumUsersRepo,
  getAdminStatisticsRepo,
  createAdminUserRepo,
  getAdminUserByEmailRepo,
  getAdminUserDetailRepo,
  updateAdminUserRepo,
  deactivateAdminUserRepo,
  activateAdminUserRepo,
  deleteAdminUserRepo,
  getAdminUserPaymentsRepo,
  getAdminProfileRepo,
  updateAdminProfileRepo,
} from "./admin.repository.js";

const createHttpError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const resolveIsPremium = (payload) => {
  if (payload.isPremium !== undefined) return Boolean(payload.isPremium);

  const rawType = payload.userType ?? payload.accountType ?? payload.tipe ?? payload.plan;
  if (!rawType) return false;

  return ["premium", "Premium", "PREMIUM"].includes(rawType);
};

const normalizeUserUpdatePayload = async (payload, { isCreate = false } = {}) => {
  const data = {};

  const fullName = payload.fullName ?? payload.name ?? payload.nama;
  if (fullName !== undefined) data.fullName = String(fullName).trim();

  if (payload.email !== undefined) data.email = String(payload.email).trim().toLowerCase();
  if (payload.phone !== undefined) data.phone = String(payload.phone).trim();
  if (payload.telp !== undefined) data.phone = String(payload.telp).trim();

  const profilePicture = payload.profilePicture ?? payload.avatarUrl ?? payload.profileImage;
  if (profilePicture !== undefined && typeof profilePicture === "string") {
    data.profilePicture = profilePicture;
  }

  if (
    payload.isPremium !== undefined ||
    payload.userType !== undefined ||
    payload.accountType !== undefined ||
    payload.tipe !== undefined ||
    payload.plan !== undefined
  ) {
    data.isPremium = resolveIsPremium(payload);
  }

  if (payload.premiumExpiredAt !== undefined) {
    data.premiumExpiredAt = payload.premiumExpiredAt ? new Date(payload.premiumExpiredAt) : null;
  }

  if (payload.password) {
    if (String(payload.password).length < 8) {
      throw createHttpError("Password minimal 8 karakter", 422);
    }
    data.passwordHash = await hashPassword(String(payload.password));
  }

  if (isCreate) {
    if (!data.fullName) throw createHttpError("Nama lengkap wajib diisi", 422);
    if (!data.email) throw createHttpError("Email wajib diisi", 422);
    if (!data.passwordHash) throw createHttpError("Password wajib diisi", 422);
    data.role = { connect: { name: ROLES.USER } };
  }

  return data;
};

export const getDashboardSummary = async () => getDashboardSummaryRepo();
export const getAdminUsers = async () => getAdminUsersRepo();
export const getPremiumUsers = async () => getPremiumUsersRepo();
export const getAdminStatistics = async () => getAdminStatisticsRepo();

export const createAdminUser = async (payload) => {
  const data = await normalizeUserUpdatePayload(payload, { isCreate: true });
  const existing = await getAdminUserByEmailRepo(data.email);

  if (existing) throw createHttpError("Email sudah digunakan", 409);

  return createAdminUserRepo(data);
};

export const getAdminUserDetail = async (userId) => {
  const user = await getAdminUserDetailRepo(userId);
  if (!user) throw createHttpError("User tidak ditemukan", 404);
  return user;
};

export const updateAdminUser = async (userId, payload) => {
  await getAdminUserDetail(userId);
  const data = await normalizeUserUpdatePayload(payload);

  if (Object.keys(data).length === 0) {
    throw createHttpError("Tidak ada data yang diperbarui", 422);
  }

  return updateAdminUserRepo(userId, data);
};

export const deactivateAdminUser = async (userId) => {
  await getAdminUserDetail(userId);
  return deactivateAdminUserRepo(userId);
};

export const activateAdminUser = async (userId) => {
  await getAdminUserDetail(userId);
  return activateAdminUserRepo(userId);
};

export const deleteAdminUser = async (userId) => {
  await getAdminUserDetail(userId);

  try {
    return await deleteAdminUserRepo(userId);
  } catch (error) {
    if (error?.code === "P2003") {
      throw createHttpError(
        "User tidak bisa dihapus karena masih terhubung dengan data lain yang wajib dipertahankan",
        409,
      );
    }

    throw error;
  }
};

export const getAdminUserPayments = async (userId) => {
  await getAdminUserDetail(userId);
  return getAdminUserPaymentsRepo(userId);
};

export const getAdminProfile = async (adminId) => {
  const profile = await getAdminProfileRepo(adminId);
  if (!profile) throw createHttpError("Profil admin tidak ditemukan", 404);
  return profile;
};

export const updateAdminProfile = async (adminId, payload) => {
  const normalized = {
    ...payload,
    fullName: payload.fullName ?? payload.nama,
    profilePicture: payload.profilePicture ?? payload.avatarUrl,
  };

  if (normalized.email) normalized.email = String(normalized.email).trim().toLowerCase();
  if (normalized.fullName) normalized.fullName = String(normalized.fullName).trim();

  return updateAdminProfileRepo(adminId, normalized);
};
