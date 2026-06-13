import api from "@/lib/api";

export const getPremiumStatus = async () => {
  const { data } = await api.get("/premium/status");
  return data.data;
};

export const getPeriodisasi = async () => {
  const { data } = await api.get("/premium/periodisasi");
  return data.data;
};