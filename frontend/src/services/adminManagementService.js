import api from "@/lib/api";

export const getAdminManagementUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const getAdminUserDetail = async (userId) => {
  const response = await api.get(`/admin/users/${userId}`);
  return response.data;
};

export const createAdminUser = async (payload) => {
  const response = await api.post("/admin/users", payload);
  return response.data;
};

export const updateAdminUser = async (userId, payload) => {
  const response = await api.patch(`/admin/users/${userId}`, payload);
  return response.data;
};

export const deactivateAdminUser = async (userId, payload = {}) => {
  const response = await api.patch(`/admin/users/${userId}/deactivate`, payload);
  return response.data;
};

export const activateAdminUser = async (userId) => {
  const response = await api.patch(`/admin/users/${userId}/activate`);
  return response.data;
};

export const getAdminUserPayments = async (userId) => {
  const response = await api.get(`/admin/users/${userId}/payments`);
  return response.data;
};

export const deleteAdminUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};