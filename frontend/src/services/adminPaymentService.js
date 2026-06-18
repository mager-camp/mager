import api from "@/lib/api";

export const getAdminPaymentSummary = async () => {
  const response = await api.get("/admin-payments/summary");
  return response.data.data;
};

export const getAdminPaymentTransactions = async (status = "all") => {
  const response = await api.get("/admin-payments/transactions", {
    params: { status },
  });

  return response.data.data;
};

export const getAdminPaymentMethods = async () => {
  const response = await api.get("/admin-payments/methods");
  return response.data.data;
};

export const createAdminPaymentMethod = async (payload) => {
  const response = await api.post("/admin-payments/methods", payload);
  return response.data.data;
};

export const updateAdminPaymentMethod = async (id, payload) => {
  const response = await api.patch(`/admin-payments/methods/${id}`, payload);
  return response.data.data;
};

export const deleteAdminPaymentMethod = async (id) => {
  const response = await api.delete(`/admin-payments/methods/${id}`);
  return response.data.data;
};