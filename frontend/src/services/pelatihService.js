import api from "@/lib/api";

export const getPelatihDashboard = async () => {
  const response = await api.get("/pelatih/dashboard");
  return response.data.data;
};

export const getPelatihAtlet = async () => {
  const response = await api.get("/pelatih/atlet");
  return response.data.data;
};

export const getPelatihKursus = async () => {
  const response = await api.get("/pelatih/kursus");
  return response.data.data;
};

export const getPelatihJadwal = async () => {
  const response = await api.get("/pelatih/jadwal");
  return response.data.data;
};

export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data.data;
};

export const updateProfile = async (payload) => {
  const response = await api.patch("/profile", payload);
  return response.data.data;
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  const response = await api.patch("/profile/change-password", {
    currentPassword,
    newPassword,
  });

  return response.data;
};
