import api from "@/lib/api";

export const getAdminProfile = async () => {
  const response = await api.get("/admin/profile");
  return response.data;
};

export const updateAdminProfile = async (payload) => {
  const response = await api.put("/admin/profile", payload);
  return response.data;
};